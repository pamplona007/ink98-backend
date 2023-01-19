import { Store } from "src/stores/store.schema";

export class CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin" | "seller" = "user";
  isVerified?: boolean = false;
  isActive?: boolean = true;
  store?: Store | string;
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
}
