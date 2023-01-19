import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "./products/products.module";
import { CartsModule } from "./carts/carts.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import * as dotenv from "dotenv";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./_shared/guards/roles.guards";
import { StoresModule } from "./stores/stores.module";
import { JwtAuthGuard } from "./_shared/guards/jwt-auth.guard";

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProductsModule,
    CartsModule,
    UsersModule,
    AuthModule,
    StoresModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
