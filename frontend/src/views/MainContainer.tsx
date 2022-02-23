import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import useBeforeUnload from '../hooks/useBeforeUnload';
import { RootState } from '../store/rootState';
import * as LoginActions from './login/actions/authActions';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import { ToastComponent } from '../components/index';
import MenuComponent from '../components/Menu/MenuComponent';
import { IUserDetail } from '../types/user';
import { Label } from 'semantic-ui-react';

interface StateProps {
  user: IUserDetail | null;
  loggedIn: boolean;
}

interface DispatchProps {
  logout: () => void;
  getLoggedInUser: () => void;
}

type Props = StateProps & DispatchProps;

const appVersion = process.env.REACT_APP_VERSION;

const MainContainer = (props: Props): JSX.Element => {

  const { loggedIn, getLoggedInUser, logout } = props
  useBeforeUnload((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  });

  useEffect(() => {
    if (loggedIn || sessionStorage.getItem('user')) {
      getLoggedInUser();
    }
  }, [getLoggedInUser, loggedIn]);

  const _logout = useCallback(() => {
    logout();
  }, [logout])

  return (
    <div className="App">
      {props.user?.authenticated || sessionStorage.getItem('user') ? (
        <MenuComponent logout={_logout} user={props.user} />
      ) : null}
      {props.user?.authenticated || sessionStorage.getItem('user') ? (
        <ProtectedRoutes
          loggedIn={!!sessionStorage.getItem('user')}
          user={props.user}
        />
      ) : (
        <PublicRoutes loggedIn={props.user?.authenticated} />
      )}
      <Label size='mini' basic style={{background: '#000000', color:'white', float: 'right', position: 'fixed', margin: '0.5rem', top: '96.5%', left: '97%'}} content={`v${appVersion}`} />
      <ToastComponent />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.authState.user,
    loggedIn: state.authState.loginStatus,
  };
};

const mapDispatchToProps = (
  dispatch: LoginActions.AuthThunkDispatchType
): DispatchProps => {
  return {
    logout: async () => dispatch(LoginActions.logout()),
    getLoggedInUser: () => dispatch(LoginActions.getLoggedInUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);