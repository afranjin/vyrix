import React, { useEffect } from 'react';
import * as LoginActions from '../../login/actions/authActions';
import { RootState } from '../../../store/rootState';
import { History, Location } from 'history';
import { match } from 'react-router';
import { IUser } from '../../../types/auth';
import { connect } from 'react-redux';
import * as AdministartionActions from '../actions/administrationActionts'


interface OwnProps {
  location: Location;
  history: History;
  match: match;
}

interface StateProps {
  user: IUser | null;
}

interface DispatchProps {
  getLoggedInUser: () => void;
}

type Props = StateProps & OwnProps & DispatchProps;

const AdministrationContainer = (props: Props): JSX.Element => {

  useEffect(() => {
    props.getLoggedInUser()
  })

  return (
    <div>Administration</div>
  )
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.authState.user
  }
};

const mapDispatchToProps = (dispatch: LoginActions.AuthThunkDispatchType): DispatchProps => {
  return {
    getLoggedInUser: () => dispatch(LoginActions.getLoggedInUser())
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(AdministrationContainer);
