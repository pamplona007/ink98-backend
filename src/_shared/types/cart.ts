import { Variant } from "./product";

export interface CartItem {
  product: string;
  quantity: number;
  variant: Variant;
}
