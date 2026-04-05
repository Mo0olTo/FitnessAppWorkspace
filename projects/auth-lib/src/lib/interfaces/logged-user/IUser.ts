import { Addresses, Wishlist } from "../sign-up/ISignUpRes";

export interface IUser{
  message: string;
  user: User;
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
  passwordChangedAt: string;
}