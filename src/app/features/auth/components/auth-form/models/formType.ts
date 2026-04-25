import { AuthFormState } from "../../../../../shared/models/authFormState";

export type FormType = 'login'| 'register' | 'forgetPass' | 'newPass' | 'otp';

export interface FormFieldConfig {
  key: keyof AuthFormState;
  type: "text" | "email" | "password";
  icon: "email" | "password" | "user" | "eye" | null;
  placeholder: string;
  valueKey: string;
  outputKey: string;
}

export interface FormConfig {
    title: {
            title: string;
            subTitle?: string;
            reverse?: boolean;
         };

  heading?: string;

  fields?: FormFieldConfig[];

  buttonText: string;

  showSocial?: boolean;

  forgetLink?: boolean;

    footer?: {
            text: string;
            actionText: string;
            route?: string;
        };
}