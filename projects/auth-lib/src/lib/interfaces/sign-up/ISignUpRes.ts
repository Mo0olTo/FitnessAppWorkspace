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
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  _id: string;
  createdAt: string;
}