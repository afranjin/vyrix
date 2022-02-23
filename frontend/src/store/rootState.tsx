import { AuthState } from '../views/login/reducers';
import { AdministrationState } from '../views/administration/reducers';

export interface RootState {
  authState: AuthState;
  administrationState: AdministrationState;
}
