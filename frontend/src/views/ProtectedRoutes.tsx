import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { IUser } from '../types/auth';
import AdministrationContainer from './administration/containers/AdministrationContainer';
import UserManagementContainter from './administration/containers/UserManagementContainter';
import EmailConfigurationContainer from './administration/containers/EmailConfigurationContainer';
import { Header } from 'semantic-ui-react';

interface Props {
  user: IUser | null;
  loggedIn: boolean;
}

const routes = [
  { exact: true, path: '/administration', component: AdministrationContainer, permissions: [] },
  { exact: true, path: '/administration/user-management', component: UserManagementContainter, permissions: [] },
  { exact: true, path: '/administration/email-configuration', component: EmailConfigurationContainer, permissions: [] },
  { exact: false, path: '/', component: null, roles: []}
]

const Forbidden = (): JSX.Element =>  <Header as='h1'>Forbidden.</Header>;

const ProtectedRoutes = (props: Props): JSX.Element => {
  return (
    <Switch>
      {routes.map((route, idx) => {
        if (route.component) {
          if ((props.user && props.user.authenticated) || props.loggedIn) {
            return (
              <Route key={idx} exact={route.exact} path={route.path} component={route.component} />
            )
          }
          /* Load Forbidden component if user tries to access forbidden component via url */
          return <Route key={idx} exact={route.exact} path={route.path} component={Forbidden} />
        }
        /* Redirect if path doesn't match any known route */
        return <Redirect key={idx} to={route.path} />
      })}
    </Switch>
  )
}

export default ProtectedRoutes;
