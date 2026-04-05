/*
 * Public API Surface of auth-lib
 */
//! Services
export * from './lib/auth-lib';


//! Base classes
export * from './lib/base/authAPI';

//! Interfaces
export * from './lib/adapter/authAPIRes.adapter';

//! Request Interfaces
export * from './lib/interfaces/forget-password/IForgetReq';
export * from './lib/interfaces/reset-password/IResetReq';
export * from './lib/interfaces/sign-in/ISignInReq';
export * from './lib/interfaces/sign-up/ISignUpReq';
export * from './lib/interfaces/verify-code/IVerifyReq';

//! Response Interfaces
export * from './lib/interfaces/forget-password/IForgetRes';
export * from './lib/interfaces/log-out/ILogOutRes';
export * from './lib/interfaces/reset-password/IResetRes';
export type { ISignInRes } from './lib/interfaces/sign-in/ISignInRes';
export type { ISignUpRes } from './lib/interfaces/sign-up/ISignUpRes';
export * from './lib/interfaces/verify-code/IVerifyRes';

//! User Interface (export from sign-up to avoid conflicts)
export type { User } from './lib/interfaces/sign-up/ISignUpRes';

//! Enums
export * from './lib/enums/AuthEndPoints';

//! Adapters
export * from './lib/adapter/authAPIRes.adapter';

//! Adapted Response Interfaces
export * from './lib/interfaces/adapter/AdaptedSignInRes';
export * from './lib/interfaces/adapter/AdaptedSignUpRes';
// Export Token

export * from './lib/tokens/tokens';


