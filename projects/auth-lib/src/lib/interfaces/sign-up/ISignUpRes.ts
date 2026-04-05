export interface ISignUpRes {
  message: string;
  user: User;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: Wishlist[];
  _id: string;
  addresses:  Addresses [];
  createdAt: string;
}

export interface Wishlist {
  user: string;
  products: Product[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold?: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: null;
  isInWishlist: boolean;
  discount?: number;
}



export interface Addresses {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}