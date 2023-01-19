import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { Model } from "mongoose";
import { Role } from "src/_shared/types/roles";
import { CreateUserDto } from "./dto/create-user.dto";
import { toSellerDto } from "./dto/response-seller.dto";
import { toUserDto } from "./dto/response-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const userByUsername = await this.findByUsername(createUserDto.username);
    const userByEmail = await this.findByEmail(createUserDto.email);
    if (userByUsername || userByEmail) {
      throw new UnauthorizedException("Username already exists");
    }

    const { password, ...rest } = createUserDto;

    const hashedPassword = await hash(
      password,
      Number(process.env.JWT_SALT_ROUNDS)
    );

    return await this.userModel.create({
      ...rest,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByUsername(username: string) {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  findByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    delete updateUserDto.password;

    const user = await this.userModel
      .findByIdAndUpdate(id, {
        ...updateUserDto,
        updatedAt: new Date(),
      })
      .exec();

    return toUserDto(user);
  }

  async changePassword(id: string, password: string) {
    return this.userModel
      .findByIdAndUpdate(id, {
        password: await hash(password, Number(process.env.JWT_SALT_ROUNDS)),
        updatedAt: new Date(),
      })
      .exec();
  }

  async findAllSellers() {
    const users = await this.userModel.find({ role: Role.Seller }).exec();
    return users.map(toSellerDto);
  }

  async findOneSeller(id: string) {
    const user = await this.userModel
      .findById(id)
      .where("role")
      .equals(Role.Seller)
      .exec();
    return toSellerDto(user);
  }

  verifySeller(id: string) {
    return this.userModel
      .findByIdAndUpdate(id, {
        isVerified: true,
        updatedAt: new Date(),
      })
      .exec();
  }
}
