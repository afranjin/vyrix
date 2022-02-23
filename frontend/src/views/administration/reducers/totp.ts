import * as constants from '../actions/constants';
import { AdministrationActions } from '../actions/administrationActionts';
import { initialTOTPState, ITotpConfig } from '../../../types/user';

export const totp = (state: ITotpConfig = initialTOTPState, action: AdministrationActions): ITotpConfig => {
  switch(action.type) {
    case constants.GET_TOTP_CONF_SUCCESS:
      return action.totp

    default:
      return state;
  }
}