
export class AuthEndPoint {

  //* REGISTER AND LOGIN
  static SIGNIN = `/auth/signin`;
  static SIGNUP = `/auth/signup`;
  static LOGOUT = `/auth/logout`;
  static GETLOGGEDUSERDATA = `/auth/profile-data`;
  static CHANGEPASSWORD = `/auth/change-password`;
  static UPLOADPHOTO = `/auth/upload-photo`;
  static EDITPROFILE = `/auth/editProfile`;
  //* FORGET PASSWORD
  static FORGETPASSWORD = `/auth/forgotPassword`;
  static VERIFY = `/auth/verifyResetCode`;
  static RESETPASSWORD = `/auth/resetPassword`;
}
