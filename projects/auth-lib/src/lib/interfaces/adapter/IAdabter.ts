import { ISignInRes } from "../sign-in/ISignInRes";
import { ISignUpRes } from "../sign-up/ISignUpRes";
import { AdaptedSignInRes } from "./AdaptedSignInRes";
import { AdaptedSignUpRes } from "./AdaptedSignUpRes";

export interface Adaptor{
    adaptSignUp(data: ISignUpRes): AdaptedSignUpRes;
    adaptSignIn(data: ISignInRes): AdaptedSignInRes;
}