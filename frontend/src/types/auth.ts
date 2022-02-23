
export enum AuthStatus {
  Authenticated,
  Unauthenticated,
  Authenticating
}

export interface IUser {
  username: string;
  email: string;
  authenticated: boolean;
  permissions: string[];
}

export interface IUserAuthResponse extends IUser {
  authenticated: boolean;
}

export interface IUserAuthStatus {
  user: IUser;
  status: AuthStatus;
}

export interface IUserRole {
  permissions: string[];
}

export interface ICredentials {
  username: string;
  password: string;
  totp?: string;
}