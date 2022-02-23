import { combineReducers } from 'redux';
import { RootState } from './rootState';
import authApp from '../views/login/reducers/index';
import administrationApp from '../views/administration/reducers';

export default combineReducers<RootState>({
  authState: authApp,
  administrationState: administrationApp
});
