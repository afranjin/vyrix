import { initalUsersState, IUserDetail } from '../../../types/user';
import * as constants from '../actions/constants';
import { AdministrationActions } from '../actions/administrationActionts';

export const user = (state: IUserDetail = initalUsersState, action: AdministrationActions): IUserDetail => {
  switch(action.type) {
    case constants.GET_USER_SUCCESS:
      return action.user

    default:
      return state;
  }
}