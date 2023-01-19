import { Variant } from "src/_shared/types/product";

export class CreateCartItemDto {
  cartId: string;
  productId: string;
  variant: Variant;
  quantity: number;
}
