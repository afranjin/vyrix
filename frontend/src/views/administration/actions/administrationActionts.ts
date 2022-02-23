import { toast } from 'react-toastify';
import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ConfigurationApi } from '../../../api/configurationApi';
import { UserApi } from '../../../api/userApi';
import { toastMsg } from '../../../components/Toast/toastMsg';
import { IMailConfiguration } from '../../../types/configuration';
import { ITotpConfig, IUserDetail } from '../../../types/user';
import * as constants from './constants';
import { AdministrationState } from '../reducers';

export type AdministrationThunkResult<R> = ThunkAction<Promise<R | null>, AdministrationState, null, AdministrationActions>
export type AdministrationThunkDispatchType = ThunkDispatch<AdministrationState, null, AdministrationActions>

export interface GetUsersSuccess {
  type: constants.GET_USERS_SUCCESS;
  users: IUserDetail[];
}

export interface GetUserSuccess {
  type: constants.GET_USER_SUCCESS;
  user: IUserDetail;
}

export interface CreateUserSuccess {
  type: constants.CREATE_USER_SUCCESS;
  user: IUserDetail;
}

export interface UpdateUserSuccess {
  type: constants.UPDATE_USER_SUCCESS;
  user: IUserDetail;
}

export interface SetPasswordSuccess {
  type: constants.SET_PASSWORD_SUCCESS;
}

export interface UpdatePermissionSuccess {
  type: constants.UPDATE_PERMISSION_SUCCESS;
}

export interface GetTOTPConfSuccess {
  type: constants.GET_TOT_CONF_SUCCESS;
  totp: ITotpConfig;
}

export interface CreateTOTPConfSuccess {
  type: constants.CREATE_TOT_CONF_SUCCESS;
}

export interface DeleteTOTPConfSuccess {
  type: constants.DELETE_TOT_CONF_SUCCESS;
}

export interface AdministrationHasErrored {
  type: constants.ADMINISTRATION_HAS_ERRORED;
  hasErrored: boolean;
}

export interface SetSelectedUser {
  type: constants.SET_SELECTED_USER;
  user: IUserDetail;
}

export interface GetEmailConfSuccess {
  type: constants.GET_EMAIL_CONFIG_SUCCESS;
  emailConf: IMailConfiguration;
}

export interface SetEmailConfSuccess {
  type: constants.SET_EMAIL_CONFIG_SUCCESS;
  emailConf: IMailConfiguration;
}


export const administrationHasErrored = (hasErrored: boolean, error?: Error, action?: string): AdministrationHasErrored => {
  if (error && action) {
    const errorMsg = error.message
    toast.error(`${action} - ${errorMsg}`);
  }
  return {
    type: constants.ADMINISTRATION_HAS_ERRORED,
    hasErrored: hasErrored
  };
}

export const getUsers: ActionCreator<AdministrationThunkResult<IUserDetail[]>>
 = (): AdministrationThunkResult<IUserDetail[]> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.getUsers()
      .then(response => {
        dispatch(getUsersSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.GET_USERS))
        return null
      })
  };
}

export const getUsersSuccess = (users: IUserDetail[]): GetUsersSuccess => {
  return {
    type: constants.GET_USERS_SUCCESS,
    users
  };
}

export const getUser:  ActionCreator<AdministrationThunkResult<IUserDetail>>
= (id: number): AdministrationThunkResult<IUserDetail> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.getUser(id)
      .then(response => {
        dispatch(getUserSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.GET_USER))
        return null
      })
  };
}

export const getUserSuccess = (user: IUserDetail): GetUserSuccess => {
  return {
    type: constants.GET_USER_SUCCESS,
    user
  };
}

export const createUser: ActionCreator<AdministrationThunkResult<IUserDetail>>
= (user: IUserDetail): AdministrationThunkResult<IUserDetail> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.createUser(user)
      .then(response => {
        dispatch(createUserSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.CREATE_USER))
        return null
      })
  };
}

export const createUserSuccess = (user: IUserDetail): CreateUserSuccess => {
  toastMsg(`User ${user.email} created.`, constants.CREATE_USER_SUCCESS, 'success');
  return {
    type: constants.CREATE_USER_SUCCESS,
    user
  };
}

export const updateUser: ActionCreator<AdministrationThunkResult<IUserDetail>>
= (user: IUserDetail): AdministrationThunkResult<IUserDetail> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.updateUser(user)
      .then(response => {
        dispatch(updateUserSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.UPDATE_USER))
        return null
      })
  };
}

export const updateUserSuccess = (user: IUserDetail): UpdateUserSuccess => {
  toastMsg(`User ${user.email} updated.`, constants.UPDATE_USER_SUCCESS, 'success');
  return {
    type: constants.UPDATE_USER_SUCCESS,
    user
  };
}

export const setPassword: ActionCreator<AdministrationThunkResult<null>>
= (id: number, pwd: string): AdministrationThunkResult<null> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.setPassword(id, pwd)
      .then(() => {
        dispatch(setPasswordSuccess())
        return null
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.SET_PASSWORD))
        return null
      })
  };
}

export const setPasswordSuccess = (): SetPasswordSuccess => {
  toastMsg(`Password changed.`, constants.SET_PASSWORD_SUCCESS, 'success');
  return {
    type: constants.SET_PASSWORD_SUCCESS
  };
}


export const updatePermissions: ActionCreator<AdministrationThunkResult<null>>
= (id: number, permissions: string[]): AdministrationThunkResult<null> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.updatePermissions(id, permissions)
      .then(() => {
        dispatch(updatePermissionsSuccess())
        return null
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.UPDATE_PERMISSION))
        return null
      })
  };
}

export const updatePermissionsSuccess = (): UpdatePermissionSuccess => {
  toastMsg(`Permissions updated.`, constants.UPDATE_PERMISSION_SUCCESS, 'success');
  return {
    type: constants.UPDATE_PERMISSION_SUCCESS
  };
}

export const getTOTPConf: ActionCreator<AdministrationThunkResult<ITotpConfig>>
= (id: number): AdministrationThunkResult<ITotpConfig> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.getTotpConfiguration(id)
      .then(response => {
        dispatch(getTOTPConfSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.GET_TOTP_CONF))
        return null
      })
  };
}

export const getTOTPConfSuccess = (totp: ITotpConfig): GetTOTPConfSuccess => {
  return {
    type: constants.GET_TOTP_CONF_SUCCESS,
    totp
  };
}

export const createTOTPConf: ActionCreator<AdministrationThunkResult<null>>
= (id: number): AdministrationThunkResult<null> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.createTotpConfiguration(id)
      .then(() => {
        dispatch(createTotpConfiguration())
        return null
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.CREATE_TOTP_CONF))
        return null
      })
  };
}

export const createTotpConfiguration = (): CreateTOTPConfSuccess => {
  toastMsg(`TOTP configuration created.`, constants.CREATE_TOTP_CONF_SUCCESS, 'success');
  return {
    type: constants.CREATE_TOTP_CONF_SUCCESS,
  };
}

export const deleteTOTPConf: ActionCreator<AdministrationThunkResult<null>>
= (id: number): AdministrationThunkResult<null> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return UserApi.deleteTotpConfiguration(id)
      .then(() => {
        dispatch(deleteTotpConfiguration())
        return null
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.DELETE_TOTP_CONF))
        return null
      })
  };
}

export const deleteTotpConfiguration = (): DeleteTOTPConfSuccess => {
  toastMsg(`TOTP configuration deleted.`, constants.DELETE_TOTP_CONF_SUCCESS, 'success');
  return {
    type: constants.DELETE_TOTP_CONF_SUCCESS,
  };
}

export const selectdUser = (user: IUserDetail): SetSelectedUser => {
  return {
    type: constants.SET_SELECTED_USER,
    user
  };
}

export const getEmailConf: ActionCreator<AdministrationThunkResult<IMailConfiguration>>
= (): AdministrationThunkResult<IMailConfiguration> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return ConfigurationApi.getMailConfiguration()
      .then(response => {
        dispatch(getEmailConfSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.GET_EMAIL_CONFIG))
        return null
      })
  };
}

export const getEmailConfSuccess = (emailConf: IMailConfiguration): GetEmailConfSuccess => {
  return {
    type: constants.GET_EMAIL_CONFIG_SUCCESS,
    emailConf
  };
}

export const setEmailConf: ActionCreator<AdministrationThunkResult<IMailConfiguration>>
= (conf: IMailConfiguration): AdministrationThunkResult<IMailConfiguration> => {
  return async (dispatch: AdministrationThunkDispatchType) => {
    return ConfigurationApi.setMailConfiguration(conf)
      .then(response => {
        dispatch(setEmailConfSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(administrationHasErrored(true, error, constants.SET_EMAIL_CONFIG))
        return null
      })
  };
}

export const setEmailConfSuccess = (emailConf: IMailConfiguration): SetEmailConfSuccess => {
  toastMsg(`Email configuration updated.`, constants.GET_EMAIL_CONFIG_SUCCESS, 'success');
  return {
    type: constants.SET_EMAIL_CONFIG_SUCCESS,
    emailConf
  };
}

export type AdministrationActions
  = GetUsersSuccess
  | GetUserSuccess
  | CreateUserSuccess
  | UpdateUserSuccess
  | SetPasswordSuccess
  | UpdatePermissionSuccess
  | GetTOTPConfSuccess
  | CreateTOTPConfSuccess
  | DeleteTOTPConfSuccess
  | AdministrationHasErrored
  | SetSelectedUser
  | GetEmailConfSuccess
  | SetEmailConfSuccess;
