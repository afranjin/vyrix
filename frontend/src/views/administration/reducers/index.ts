import { combineReducers } from 'redux';
import { IMailConfiguration } from '../../../types/configuration';
import { ITotpConfig, IUserDetail } from '../../../types/user';
import { emailConf } from './emailConf';
import { selectedUser } from './selectedUser';
import { totp } from './totp';
import { user } from './user';
import { users } from './users';

export interface AdministrationState {
  users: IUserDetail[];
  selectedUser: IUserDetail;
  user: IUserDetail;
  totp: ITotpConfig;
  emailConf: IMailConfiguration;
}

const administrationApp = combineReducers<AdministrationState>({
  users,
  selectedUser,
  user,
  totp,
  emailConf
})

export default administrationApp;