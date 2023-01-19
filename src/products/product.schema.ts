import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  Document,
  HydratedDocument,
  Schema as MongooseSchema,
  SchemaTypes,
} from "mongoose";
import { Variant } from "src/_shared/types/product";
import { User } from "../users/user.schema";

export const ColorSchema = new MongooseSchema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
});

export const SizeSchema = new MongooseSchema({
  name: { type: String, required: true },
  abbreviation: { type: String, required: true },
});

export const VariantSchema = new MongooseSchema({
  color: { type: ColorSchema, required: true },
  size: { type: SizeSchema, required: true },
  sku: { type: String, required: true },
  images: { type: [String], required: false },
  inventory: { type: Number, required: true, min: 0 },
});

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: false })
  seller: User;

  @Prop({ required: true, type: [VariantSchema] })
  variants: Variant[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
