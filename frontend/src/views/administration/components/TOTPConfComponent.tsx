import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { ITotpConfig, IUserDetail } from '../../../types/user';

interface Props {
  totp: ITotpConfig;
  user: IUserDetail;
  deactivateTOPT: (id: number) => Promise<void>;
  activateTOPT: (id: number) => Promise<void>;
}

const TOTPConfComponent = (props: Props): JSX.Element => {
  const { totp, user, deactivateTOPT, activateTOPT } = props

  const [disableActive, setDisableActive] = useState(false)
  const [disableDeactivate, setDisableDeactivate] = useState(false)

  const renderQR = (): JSX.Element | null => {
    if (totp.url) {
      return <QRCode value={totp.url} renderAs='svg' />;
    }
    return null;
  }

  const _activate2FA = (): void => {
    setDisableActive(true);
    activateTOPT(user.id ? user.id : -1).then(() => setDisableActive(false));
  }

  const _deactivate2FA = (): void => {
    setDisableDeactivate(true);
    deactivateTOPT(user.id ? user.id : -1).then(() => setDisableDeactivate(false));
  }

  const renderTOTP = (): JSX.Element => {
    if (totp.enabled) {
      return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', textAlign: 'start' }}>
          <Header style={{ marginBottom: '1rem' }}>
            2FA for {user.email} is active.
          </Header>
          <div style={{ marginBottom: '1rem' }}>
            {renderQR()}
          </div>
          <div>
            <Button disabled={disableDeactivate} color='red' content='Deactivate 2FA' onClick={_deactivate2FA}/>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', textAlign: 'start' }}>
          <Header style={{ marginBottom: '1rem' }}>
            2FA for {user.email} is not active.
          </Header>
          <div>
            <Button disabled={disableActive} color='blue' content='Activate 2FA' onClick={_activate2FA}/>
          </div>
        </div>
      )
    }
  }
  return (
    <React.Fragment>
      {renderTOTP()}
    </React.Fragment>
  )
}

export default TOTPConfComponent;
