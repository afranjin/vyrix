
import { ICredentials } from '../types/auth';
import { IUserDetail } from '../types/user';
import { HttpClient } from './service';
import Urls from './urls';

export const AuthApi = {
  loggedInUser(): Promise<IUserDetail> {
    return HttpClient.get<IUserDetail, null>(Urls.AuthUrls.loginPath)
  },

  login(credentials: ICredentials): Promise<IUserDetail> {
    return HttpClient.post<IUserDetail, ICredentials>(Urls.AuthUrls.loginPath, credentials)
  },

  logout(): Promise<null> {
    return HttpClient.post<null, null>(Urls.AuthUrls.logoutPath, null)
  }
}
