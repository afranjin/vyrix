import { initalUsersState, IUserDetail } from '../../../types/user';
import { AdministrationActions } from '../actions/administrationActionts';
import * as constants from '../actions/constants';

export const selectedUser = (state: IUserDetail = initalUsersState, action: AdministrationActions): IUserDetail => {
  switch(action.type) {
    case constants.SET_SELECTED_USER:
      return action.user

    case constants.GET_USERS_SUCCESS: {
      const _usr = action.users.find(u => u.id === state.id)
      if (_usr) {
        return _usr
      }
      return state
    }
    case constants.CREATE_USER_SUCCESS:
      return action.user

    default:
      return state
  }
}