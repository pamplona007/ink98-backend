import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Store, StoreSchema } from "./store.schema";
import { StoresController } from "./stores.controller";
import { StoresService } from "./stores.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
