import { User } from "../sign-in/ISignInRes";

export interface AdaptedSignInRes {
  message: string;
  token: string;
  userId: string;
  email: string;
  user:User
}
