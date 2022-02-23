import { IUserDetail, ITotpConfig } from '../types/user';
import { HttpClient } from './service';
import Urls from './urls';

export const UserApi = {

  getUsers(): Promise<IUserDetail[]> {
    return HttpClient.get<IUserDetail[], null>(Urls.UserUrls.listPath);
  },

  getUser(id: number): Promise<IUserDetail> {
    return HttpClient.get<IUserDetail, number>(`${Urls.UserUrls.detailPath}${id}/`, null);
  },

  createUser(user: IUserDetail): Promise<IUserDetail> {
    return HttpClient.post<IUserDetail, IUserDetail>(Urls.UserUrls.listPath, user);
  },

  updateUser(user: IUserDetail): Promise<IUserDetail> {
    return HttpClient.put<IUserDetail, IUserDetail>(Urls.UserUrls.detailPath, user.id, user);
  },

  setPassword(userId: number, password: string): Promise<null>  {
    return HttpClient.post<null, { id: number, password: string }>(Urls.UserUrls.setPasswordPath, { id: userId, password} );
  },

  updatePermissions(userId: number, permissions: string[]): Promise<null>  {
    return HttpClient.post<null, { id: number, permissions: string[] }>(Urls.UserUrls.updatePermissionsPath, { id: userId, permissions });
  },

  getTotpConfiguration(userId: number): Promise<ITotpConfig> {
    return HttpClient.get<ITotpConfig, { id: number }>(Urls.UserUrls.totpConfigurationPath, { id: userId });
  },

  deleteTotpConfiguration(userId: number): Promise<null> {
    return HttpClient.delete<null, null>(`${Urls.UserUrls.totpConfigurationPath}?id=${userId}`, null);
  },

  createTotpConfiguration(userId: number): Promise<null> {
    return HttpClient.post<null, { id: number }>(Urls.UserUrls.totpConfigurationPath, { id: userId });
  }
}
