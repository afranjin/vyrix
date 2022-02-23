import { initalUsersState, IUserDetail } from './../../../types/user';
import * as constants from '../actions/constants';
import { AuthActions } from '../actions/authActions';


export const user = (state: IUserDetail | null = initalUsersState, action: AuthActions): IUserDetail | null => {
  switch(action.type) {
    case constants.LOGIN_SUCCESS:
      sessionStorage.setItem('user', JSON.stringify(action.user))
      return action.user

    case constants.LOGIN_HAS_ERRORED:
      return null;

    case constants.LOGOUT_SUCCESS: 
      return null;

    default:
      return state;
  }
}
