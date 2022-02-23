import { IUser } from './auth';

export interface IUserDetail extends IUser {
  id: number;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
}

export interface ITotpConfig {
  enabled: boolean;
  url?: string;
  error?: string;
}

export const initialTOTPState: ITotpConfig = {
  enabled: false,
  url: '',
  error: ''
}

export const initalUsersState: IUserDetail = {
  username: '',
  email: '',
  authenticated: false,
  permissions: [],
  id: -1,
  first_name: '',
  last_name: '',
  is_staff: false,
  is_active: false,
  is_superuser: false
};