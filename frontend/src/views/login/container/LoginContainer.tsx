import React from 'react';
import * as LoginActions from '../actions/authActions';
import { RootState } from '../../../store/rootState';
import LoginComponent from '../components/LoginComponent';
import { History, Location } from 'history';
import { match } from 'react-router';
import { ICredentials } from '../../../types/auth';
import { connect } from 'react-redux';
import { IUserDetail } from '../../../types/user';
// import withApplicationState from '../../../contextStore/withApplicationState';

interface OwnProps {
  location: Location;
  history: History;
  match: match;
}

interface StateProps {
  user: IUserDetail | null;
}

interface DispatchProps {
  login: (credentials: ICredentials) => Promise<IUserDetail | null>;
}

type Props = StateProps & OwnProps & DispatchProps;

const LoginContainer = (props: Props): JSX.Element => {

  const login = (credentials: ICredentials): void => {
    props.login(credentials).then(() => {
      props.history.replace('/administration')
    })
  }

  return (
    <LoginComponent login={login} />
  )
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.authState.user
  }
};

const mapDispatchToProps = (dispatch: LoginActions.AuthThunkDispatchType): DispatchProps => {
  return {
    login: async (credentials) => dispatch(LoginActions.login(credentials))
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(LoginContainer);
// To use context uncomment
// export default withApplicationState(LoginContainer);
