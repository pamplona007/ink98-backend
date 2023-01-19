import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/user.schema";
import { Role } from "src/_shared/types/roles";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product, ProductDocument } from "./product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  create(createProductDto: CreateProductDto) {
    this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, user: User, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    if (!user || (user.role !== Role.Admin && product.seller !== user._id)) {
      throw new UnauthorizedException(
        "You are not authorized to update this product"
      );
    }

    return this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
  }

  async remove(id: string, user: User) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    if (!user || (user.role !== Role.Admin && product.seller !== user._id)) {
      throw new UnauthorizedException(
        "You are not authorized to delete this product"
      );
    }

    return this.productModel.findByIdAndRemove(id).exec();
  }
}
