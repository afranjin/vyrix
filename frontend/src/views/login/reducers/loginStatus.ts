import { AuthActions } from '../actions/authActions';
import * as constants from '../actions/constants';

export const loginStatus = (state = false, action: AuthActions): boolean => {
  switch(action.type) {
    case constants.LOGIN_SUCCESS:
      return true;

    case constants.LOGIN_HAS_ERRORED:
      return false;

    case constants.LOGOUT_SUCCESS:
      sessionStorage.removeItem('user')
      return false;

    default:
      return state;
  }
}
