import { IUser, ICredentials } from '../../../types/auth';
import * as constants from './constants';
import { AuthApi } from '../../../api/authApi';
import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { toast } from 'react-toastify';
import { AuthState } from '../reducers';
import { IUserDetail } from '../../../types/user';

export type AuthThunkResult<R> = ThunkAction<Promise<R | null>, AuthState, null, AuthActions>
export type AuthThunkDispatchType = ThunkDispatch<AuthState, null, AuthActions>

export interface LoginSuccess {
  type: constants.LOGIN_SUCCESS;
  user: IUserDetail;
}

export interface LoginHasErrored {
  type: constants.LOGIN_HAS_ERRORED;
  hasErrored: boolean;
}

export interface GetLoggedInUserSuccess {
  type: constants.GET_LOGGED_IN_USER_SUCCESS;
  user: IUserDetail;
}

export interface LogoutSuccess {
  type: constants.LOGOUT_SUCCESS;
}

export const loginHasErrored = (hasErrored: boolean, error?: Error, action?: string): LoginHasErrored => {
  if (error && action) {
    const errorMsg = error.message
    toast.error(`${action} - ${errorMsg}`);
  }
  return {
    type: constants.LOGIN_HAS_ERRORED,
    hasErrored: hasErrored
  };
}

// thunk action, with side effect
export const login: ActionCreator<AuthThunkResult<IUserDetail>>
= (credentials: ICredentials): AuthThunkResult<IUserDetail> =>  {
  return async (dispatch: AuthThunkDispatchType) => {
    return AuthApi.login(credentials)
      .then(response => {
        dispatch(loginSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(loginHasErrored(true, error, constants.LOGIN))
        return null
      })
  };
}

// action, pure function
export const loginSuccess = (user: IUserDetail): LoginSuccess => {
  return {
    type: constants.LOGIN_SUCCESS,
    user
  };
}

export const getLoggedInUser: ActionCreator<AuthThunkResult<IUserDetail>>
= (): AuthThunkResult<IUserDetail> => {
  return async (dispatch: AuthThunkDispatchType) => {
    return AuthApi.loggedInUser()
      .then(response => {
        dispatch(getLoggedInUserSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(loginHasErrored(true, error, constants.GET_LOGGED_IN_USER))
        return null
      })
  };
}

export const getLoggedInUserSuccess = (user: IUserDetail): GetLoggedInUserSuccess => {
  return {
    type: constants.GET_LOGGED_IN_USER_SUCCESS,
    user
  };
}

export const logout: ActionCreator<AuthThunkResult<null>>
= (): AuthThunkResult<null> => {
  return async (dispatch: AuthThunkDispatchType) => {
    return AuthApi.logout()
      .then(response => {
        dispatch(logoutSuccess())
        return response
      })
      .catch(error => {
        dispatch(loginHasErrored(true, error, constants.LOGOUT))
        return null
      })
  };
}

export const logoutSuccess = (): LogoutSuccess => {
  return {
    type: constants.LOGOUT_SUCCESS
  };
}

export type AuthActions
  = LoginSuccess
  | LoginHasErrored
  | GetLoggedInUserSuccess
  | LogoutSuccess;
