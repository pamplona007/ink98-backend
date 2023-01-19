import { User } from "../user.schema";

class SellerDto {
  id: string;
  name: string;
}

export const toSellerDto = (user: User): SellerDto => ({
  id: user._id,
  name: user.name,
});
