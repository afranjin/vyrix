import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginContainer from './login/container/LoginContainer';

interface Props {
  loggedIn: boolean | undefined;
}

const PublicRoutes = (props: Props): JSX.Element => {
  return (
    <Switch>
      <Route path='/login' component={LoginContainer} />
      {props.loggedIn ? <Redirect to='/' /> : <Redirect to='/login' />}
    </Switch>
  )
}

export default PublicRoutes;
