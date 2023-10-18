import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart, CartDocument } from "src/carts/cart.schema";

@Injectable()
export class CheckoutService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}
  // implement checkout with pagar.me
  async checkout(cartId: string) {}
}
