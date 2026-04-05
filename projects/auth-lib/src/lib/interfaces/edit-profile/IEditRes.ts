import { Addresses, Wishlist } from "../sign-up/ISignUpRes";

export interface IEditRes {
  message: string;
  user: User;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist:   Wishlist[];
  addresses:  Addresses[];
  createdAt: string;
  passwordChangedAt: string;
}