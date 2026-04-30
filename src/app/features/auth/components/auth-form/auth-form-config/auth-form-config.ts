
import { FormConfig, FormType } from "../models/formType";

export const AUTH_FORM_CONFIG: Record<FormType, FormConfig> = {
    // login
   login: {
         title: {
             title: 'welcome back',
             subTitle: 'hey there',
             reverse: true,
             },

          heading: 'login',

         fields: [
        {
             key: 'email',
             type: 'email',
             icon: 'email',
             placeholder: 'Email',
             valueKey: 'loginEmail',
             outputKey: 'loginEmailChange',
         },

         {
             key: 'password',
             type: 'password',
             icon: 'password',
             placeholder: 'Password',
             valueKey: 'loginPassword',
             outputKey: 'loginPasswordChange',
        },
    ],

     buttonText: 'login',

     showSocial: true,

     forgetLink: true,

     footer: {
       text: 'Dont have an account yet ?',
       actionText: 'Register',
       route: '/auth/register',
    },
  },
    // register
  register: {
     title: {
       title: 'create an account',
       subTitle: 'hey there',
       reverse: true,
     },

     heading: 'register',

     fields: [
        {
         key: 'firstName',
         type: 'text',
         icon: 'user',
         placeholder: 'First Name',
         valueKey: 'firstName',
         outputKey: 'firstNameChange',
       },

       {
         key: 'lastName',
         type: 'text',
         icon: 'user',
         placeholder: 'Last Name',
         valueKey: 'lastName',
         outputKey: 'lastNameChange',
      },

      {
        key: 'email',
        type: 'email',
        icon: 'email',
        placeholder: 'Email',
        valueKey: 'regEmail',
        outputKey: 'regEmailChange',
      },

      {
         key: 'password',
         type: 'password',
         icon: 'password',
         placeholder: 'Password',
         valueKey: 'regPassword',
         outputKey: 'regPasswordChange',
      },
    ],

     buttonText: 'register',

     showSocial: true,

     footer: {
       text: 'Already Have an account !',
       actionText: 'login',
       route: '/auth/login',
    },
  },
    // forget Password
   forgetPass: {
     title: {
       title: 'forget password',
     },

     heading: 'enter your email',

     fields: [
      {
         key: 'email',
         type: 'email',
         icon: 'email',
         placeholder: 'Email',
         valueKey: 'forgetEmail',
         outputKey: 'forgetEmailChange',
      },
    ],

     buttonText: 'send OTP',
  },
    // new Password
   newPass: {
    title: {
      title: 'create new password',
    },

    heading: 'make sure its 8 characters or more',

    fields: [
      {
        key: 'password',
        type: 'password',
        icon: 'password',
        placeholder: 'Password',
        valueKey: 'newPass',
        outputKey: 'newPassChange',
      },

      {
        key: 'rePassword',
        type: 'password',
        icon: 'password',
        placeholder: 'RePassword',
        valueKey: 'rePass',
        outputKey: 'rePassChange',
      },
    ],

    buttonText: 'Done',
  },
    // OTP
   otp: {
     title: {
       title: 'otp code',
    },

     heading: 'Enter OTP and Check your email',

     buttonText: 'confirm',

     footer: {
       text: "Didn't recieve verification code ?",
       actionText: 'Resend Code?',
    },
  },
};