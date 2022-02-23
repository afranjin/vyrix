import { IUserDetail } from '../../../types/user';
import * as constants from '../actions/constants';
import { AdministrationActions } from '../actions/administrationActionts';

export const users = (state: IUserDetail[] = [], action: AdministrationActions): IUserDetail[] => {
  switch(action.type) {
    case constants.GET_USERS_SUCCESS:
      return action.users;

    case constants.UPDATE_USER_SUCCESS: {
      const users = state.map(u => {
        if (u.id === action.user.id) {
          return action.user;
        }
        return u;
      })

      return users;

    }

    default:
      return state;
  }
}
