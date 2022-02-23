import { IMailConfiguration, initialEmailState } from '../../../types/configuration';
import { AdministrationActions } from '../actions/administrationActionts';
import * as constants from '../actions/constants';


export const emailConf = (state: IMailConfiguration = initialEmailState, action: AdministrationActions): IMailConfiguration => {
  switch(action.type) {
    case constants.GET_EMAIL_CONFIG_SUCCESS:
      return action.emailConf

    case constants.SET_EMAIL_CONFIG_SUCCESS:
      return action.emailConf

    default:
      return state;
  }
}