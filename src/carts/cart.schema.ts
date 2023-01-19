import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  Document,
  HydratedDocument,
  Schema as MongooseSchema,
  SchemaTypes,
} from "mongoose";
import { VariantSchema } from "src/products/product.schema";
import { CartItem } from "src/_shared/types/cart";

export const CartItemSchema = new MongooseSchema({
  product: { type: SchemaTypes.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  variant: { type: VariantSchema, required: true },
});

@Schema()
export class Cart extends Document {
  @Prop({ required: true, type: [CartItemSchema] })
  items: CartItem[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type CartDocument = HydratedDocument<Cart>;
export const CartSchema = SchemaFactory.createForClass(Cart);
