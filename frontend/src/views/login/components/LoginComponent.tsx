import React, { useState } from 'react';
import { Button, Form, Grid, InputOnChangeData, Segment, Image, GridColumn } from 'semantic-ui-react';
import { ICredentials } from '../../../types/auth';

interface Props {
  login: (credentials: ICredentials) => void;
}

const LoginComponent = (props: Props): JSX.Element => {
  const [credentials, setCredentials] = useState<ICredentials>({
    username: '',
    password: '',
    totp: ''
  })

  const handleChangeUsername = (data: InputOnChangeData): void => {
    const _credentials = {...credentials, username: data.value}
    setCredentials(_credentials)
  }

  const handleChangePassword = (data: InputOnChangeData): void => {
    const _credentials = {...credentials, password: data.value}
    setCredentials(_credentials)
  }

  const handleChangeTOTP= (data: InputOnChangeData): void => {
    const _credentials = {...credentials, totp: data.value}
    setCredentials(_credentials)
  }

  const handleLogin = (): void => {
    props.login(credentials)
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh', background: '#000000', marginTop: '0rem' }} verticalAlign='middle'>
      <Grid.Row columns={2} style={{maxWidth: 950}}>
        <Grid.Column style={{maxWidth: 350}}>
          <Image src='logo.png' size='medium' />
        </Grid.Column>
        <Grid.Column style={{maxWidth: 550}}>
          <Segment padded style={{ background: '#4f6e7e', border: 'solid 1px #8bdefe' }}>
            <Form size='large'>
              <Form.Input
                fluid={true}
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange={(e, data) => {handleChangeUsername(data)}}
              />
              <Form.Input
                fluid={true}
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(e, data) => {handleChangePassword(data)}}
              />
              <Form.Input
                fluid={true}
                icon='mobile alternate'
                iconPosition='left'
                placeholder='OTP'
                onChange={(e, data) => {handleChangeTOTP(data)}}
              />
              <Button style={{background: '#8bdefe'}} fluid={true} size='large' onClick={(e) => handleLogin()}>
                Login
              </Button>
            </Form>
          </Segment>
        </Grid.Column>

      </Grid.Row>
      
    </Grid>
  )
}

export default LoginComponent;
