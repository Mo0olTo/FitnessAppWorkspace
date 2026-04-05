import { Addresses, Wishlist } from "../sign-up/ISignUpRes";

export interface ISignInRes {
  message: string;
  user: User;
  token: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: Wishlist[];
  addresses: Addresses[];
  createdAt: string;
}