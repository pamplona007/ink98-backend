import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "./cart.schema";
import { ProductsModule } from "src/products/products.module";

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
