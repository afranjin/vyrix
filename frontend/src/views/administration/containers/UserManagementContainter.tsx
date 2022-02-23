import { History, Location } from 'history';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Dropdown, Grid, Header, Tab } from 'semantic-ui-react';
import { RootState } from '../../../store/rootState';
import { initalUsersState, ITotpConfig, IUserDetail } from '../../../types/user';
import * as AdministartionActions from '../actions/administrationActionts';
import * as AuthActions from '../../../views/login/actions/authActions';
import { PermissionsComponent } from '../components/PermissionsComponent';
import TOTPConfComponent from '../components/TOTPConfComponent';
import { UserFormComponent } from '../components/UserFormComponent';
import { allPermissions } from '../../../types/permissions';

interface OwnProps {
  location: Location;
  history: History;
  match: match;
}

interface StateProps {
  users: IUserDetail[];
  selectedUser: IUserDetail;
  user: IUserDetail;
  totp: ITotpConfig;
}

interface DispatchProps {
  getLoggedIn: () => void;
  getUsers: () => void;
  selectUser: (user: IUserDetail) => void;
  getUser: (id: number) => void;
  createUser: (user: IUserDetail) => void;
  updateUser: (user: IUserDetail) => void;
  setPassword: (id: number, password: string) => void;
  updatePermissions: (id: number, permissions: string[]) => Promise<null>;
  getTOTPConf: (id: number) => void;
  createTOTPConf: (id: number) => Promise<null>;
  deleteTOTPConf: (id: number) => Promise<null>;
}

type Props = StateProps & OwnProps & DispatchProps;

const UserManagementContainter = (props: Props): JSX.Element => {

  const [panes, setPanes] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    props.getUsers();
  }, []);

  useEffect(() => {
    renderPanes();
  }, [props.selectedUser, props.totp, props.users]);

  const renderPanes = (): void => {
    const _panes = [{
      menuItem: 'Base Data',
      render: () => <UserFormComponent user={props.selectedUser} saveUser={saveUser} setPassword={props.setPassword}/>
    }];
    if (props.selectedUser && props.selectedUser.id !== -1 && props.selectedUser.is_superuser) {
      _panes.push({
        menuItem: 'Permissions',
        render: () =>
          <PermissionsComponent user={props.selectedUser} permissions={allPermissions()} updatePermissions={updatePermissions} />
      });
    }
    /* if (props.selectedUser && props.selectedUser.id !== -1 && props.selectedUser.username !== '') {
      _panes.push({
        menuItem: '2FA',
        render: () =>
          <TOTPConfComponent
            totp={props.totp}
            user={props.selectedUser}
            deactivateTOPT={deleteTOTPConf}
            activateTOPT={createTOTPConf}
          />
      });
    } */
    setPanes(_panes);
  }

	const handleUserChange = (event: any, data: any ): void => {
    const _user = props.users.find(u => u.email === data.value);
    if (_user) {
      props.selectUser(_user);
      if (_user.id && _user.id !== -1) {
        props.getTOTPConf(_user.id);
        props.getUser(_user.id);
      }
    } else {
      props.selectUser(initalUsersState);
      setActiveIndex(0);
    }
  }

  const saveUser = (user: IUserDetail): void => {
    if (user.id === -1) {
      props.createUser(user);
    } else {
      props.updateUser(user);
    }
  }

  const createTOTPConf = (id: number): void => {
    props.createTOTPConf(id).then(resp => props.getTOTPConf(id))
  }

  const deleteTOTPConf = (id: number): void => {
    props.deleteTOTPConf(id).then(resp => props.getTOTPConf(id))
  }

  const handleTabChange = (e: any, data: any): void => {
    setActiveIndex(data.activeIndex);
  }

  const updatePermissions = (id: number, permissions: string[]): void => {
    props.updatePermissions(id, permissions).then(resp => props.getUsers());
  }

  const renderUsers = (): JSX.Element => {
    const userOptions = props.users.map(u => {
      return {
        key: u.id,
        value: u.email,
        text: u.email
      }
    })
    return (
      <Dropdown
        placeholder='Select User'
        fluid={true}
        search={true}
        selection={true}
        options={userOptions}
        clearable={true}
        value={props.selectedUser ? props.selectedUser.email : ''}
        onChange={handleUserChange}
      />
    )
  }

  return (
    <Grid padded={true}>
      <Grid.Column width='6'>
        <Header textAlign='left'>
          User management
        </Header>
      </Grid.Column>
      <Grid.Column width='10'>
        <Grid.Row style={{ marginBottom: '1rem' }}>
          {renderUsers()}
        </Grid.Row>
        <Grid.Row>
          <Tab
            activeIndex={activeIndex}
            onTabChange={handleTabChange}
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    users: state.administrationState.users,
    selectedUser: state.administrationState.selectedUser,
    user: state.administrationState.user,
    totp: state.administrationState.totp,
  }
};

const mapDispatchToProps = (dispatch: AdministartionActions.AdministrationThunkDispatchType & AuthActions.AuthThunkDispatchType): DispatchProps => {
  return {
    getLoggedIn: () => dispatch(AuthActions.getLoggedInUser()),
    getUsers: () => dispatch(AdministartionActions.getUsers()),
    selectUser: user => dispatch(AdministartionActions.selectdUser(user)),
    getUser: id => dispatch(AdministartionActions.getUser(id)),
    createUser: user => dispatch(AdministartionActions.createUser(user)),
    updateUser: user => dispatch(AdministartionActions.updateUser(user)),
    setPassword: (id, password) => dispatch(AdministartionActions.setPassword(id, password)),
    updatePermissions: async (id, permissions) => dispatch(AdministartionActions.updatePermissions(id, permissions)),
    getTOTPConf: id => dispatch(AdministartionActions.getTOTPConf(id)),
    createTOTPConf: async id => dispatch(AdministartionActions.createTOTPConf(id)),
    deleteTOTPConf: async id => dispatch(AdministartionActions.deleteTOTPConf(id))
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(UserManagementContainter);
