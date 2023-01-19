import { Variant } from "src/_shared/types/product";

export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  image: string;
  seller?: string;
  variants: Variant[];
  isActive?: boolean = false;
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
}
