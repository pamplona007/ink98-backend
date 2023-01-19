import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "src/_shared/guards/local-auth.guard";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { Public } from "src/_shared/guards/public.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Public()
  @Post("signup")
  async signup(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return this.authService.login(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @Get("profile")
  getProfile(@Request() request: any) {
    return request.user;
  }

  @Patch("profile")
  updateProfile(@Request() request: any, @Body() body: UpdateUserDto) {
    return this.usersService.update(request.user.id, body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Patch("change-password")
  async changePassword(
    @Request() request: any,
    @Body("newPassword") password: string
  ) {
    const updatedUser = await this.usersService.changePassword(
      request.user._id,
      password
    );
    return this.authService.login(updatedUser);
  }
}
