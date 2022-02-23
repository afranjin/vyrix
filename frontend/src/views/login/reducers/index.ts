import { IUserDetail } from './../../../types/user';
import { user } from './user';
import { combineReducers } from 'redux';
import { loginStatus } from './loginStatus';

export interface AuthState {
  loginStatus: boolean;
  user: IUserDetail | null;
}

const authApp = combineReducers<AuthState>({
  loginStatus,
  user
})

export default authApp;