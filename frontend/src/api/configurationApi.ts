import { IMailConfiguration } from '../types/configuration';
import { HttpClient } from './service';
import Urls from './urls';

export const ConfigurationApi = {
  getMailConfiguration(): Promise<IMailConfiguration> {
    return HttpClient.get<IMailConfiguration, null>(Urls.ConfigUrls.configMailPath, null);
  },

  setMailConfiguration(configuration: IMailConfiguration): Promise<IMailConfiguration> {
    return HttpClient.post<IMailConfiguration, IMailConfiguration>(Urls.ConfigUrls.configMailPath, configuration);
  }
}
