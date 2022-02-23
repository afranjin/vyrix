import React, { useEffect } from 'react';
import * as AdministartionActions from '../actions/administrationActionts';
import { RootState } from '../../../store/rootState';
import { History, Location } from 'history';
import { match } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import { EmailConfComponent } from '../components/EmailConfComponent';
import { IMailConfiguration } from '../../../types/configuration';

interface OwnProps {
  location: Location;
  history: History;
  match: match;
}

interface StateProps {
  emailConf: IMailConfiguration;
}

interface DispatchProps {
  getMailConfiguartion: () => void;
  setMailConfiguartion: (conf: IMailConfiguration) => void;
}

type Props = StateProps & OwnProps & DispatchProps;

const EmailConfigurationContainer = (props: Props): JSX.Element => {

  useEffect(() => {
    props.getMailConfiguartion()
  })

  return (
    <Grid padded={true}>
      <Grid.Column width='6'>
        <Header textAlign='left'>
          Email Configuration
        </Header>
      </Grid.Column>
      <Grid.Column width='10'>
        <Grid.Row style={{ marginBottom: '1rem' }} />
        <Grid.Row>
          <EmailConfComponent conf={props.emailConf} saveEmailConf={props.setMailConfiguartion} />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    emailConf: state.administrationState.emailConf
  }
};

const mapDispatchToProps = (dispatch: AdministartionActions.AdministrationThunkDispatchType): DispatchProps => {
  return {
    getMailConfiguartion: () => dispatch(AdministartionActions.getEmailConf()),
    setMailConfiguartion: (conf) => dispatch(AdministartionActions.setEmailConf(conf))
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(EmailConfigurationContainer);
