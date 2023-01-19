import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductsService } from "src/products/products.service";
import { Variant } from "src/_shared/types/product";
import { Cart, CartDocument } from "./cart.schema";

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productsService: ProductsService
  ) {}

  async addToCart(
    cartId: string,
    productId: string,
    variant: Variant,
    quantity: number
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const productVariant = product.variants.find(({ color, size }) => {
      return color === variant.color && size === variant.size;
    });

    if (quantity > productVariant.inventory || productVariant.inventory === 0) {
      throw new BadRequestException("Not enough stock");
    }

    const cart = await this.cartModel.findOneAndUpdate(
      { _id: cartId, "items.product": productId, "items.variant": variant },
      { $inc: { "items.$.quantity": quantity } },
      { new: true, upsert: true }
    );

    return cart;
  }

  async getCart(id: string): Promise<Cart> {
    let cart = await this.cartModel
      .findById(id)
      .populate("items.product")
      .exec();
    if (!cart) {
      cart = await this.cartModel.create({ items: [] });
    }
    return cart;
  }

  async updateCartItem(
    id: string,
    productId: string,
    variant: Variant,
    quantity: number
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const productVariant = product.variants.find(({ color, size }) => {
      return color === variant.color && size === variant.size;
    });

    if (quantity > productVariant.inventory || productVariant.inventory === 0) {
      throw new BadRequestException("Not enough stock");
    }

    const cart = await this.cartModel.findOneAndUpdate(
      { _id: id, "items.product": productId, "items.variant": variant },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      throw new NotFoundException("Cart item not found");
    }

    return cart;
  }

  async removeCartItem(
    id: string,
    productId: string,
    sku: string
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);

    if (!product) {
      throw new BadRequestException("Product not found");
    }
    if (!product.variants.find((v) => v.sku === sku)) {
      throw new BadRequestException("Invalid SKU");
    }

    const cart = await this.cartModel.findOneAndUpdate(
      { _id: id },
      { $pull: { items: { product: productId, "variant.sku": sku } } },
      { new: true }
    );

    if (!cart) {
      throw new NotFoundException("Item not found in the cart");
    }

    return cart;
  }
}
