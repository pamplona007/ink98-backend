import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { Cart } from "./cart.schema";
import { CartsService } from "./carts.service";
import { CreateCartItemDto } from "./dto/create-cart.dto";

@Controller("carts")
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Get(":id")
  async getCart(@Param("id") id: string): Promise<Cart> {
    return this.cartService.getCart(id);
  }

  @Post()
  async addToCart(@Body() body: CreateCartItemDto): Promise<Cart> {
    return this.cartService.addToCart(
      body.cartId,
      body.productId,
      body.variant,
      body.quantity
    );
  }

  @Patch()
  async updateCartItem(@Body() body: CreateCartItemDto): Promise<Cart> {
    return this.cartService.updateCartItem(
      body.cartId,
      body.productId,
      body.variant,
      body.quantity
    );
  }

  @Delete(":id/:productId/:variant")
  async removeFromCart(
    @Param("id") id: string,
    @Param("productId") productId: string,
    @Param("variant") variant: string
  ): Promise<Cart> {
    return this.cartService.removeCartItem(id, productId, variant);
  }
}
