import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Roles } from "src/_shared/decorators/roles.decorators";
import { Role } from "src/_shared/types/roles";
import { Public } from "src/_shared/guards/public.guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.Seller, Role.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);

    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  @Roles(Role.Seller, Role.Admin)
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() request: any
  ) {
    return this.productsService.update(id, request.user, updateProductDto);
  }

  @Delete(":id")
  @Roles(Role.Seller, Role.Admin)
  remove(@Param("id") id: string, @Request() request: any) {
    return this.productsService.remove(id, request.user);
  }
}
