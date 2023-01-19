import { Store } from "src/stores/store.schema";
import { User } from "../user.schema";

class UserDto {
  id: string;
  name: string;
  username: string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
  store: Store | string;
  role: string;
}

export const toUserDto = (user: User): UserDto => ({
  id: user._id,
  email: user.email,
  username: user.username,
  name: user.name,
  isVerified: user.isVerified,
  isActive: user.isActive,
  store: user.store,
  role: user.role,
});
