import React, { useState } from 'react'
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react';
import { useStateFromProp } from '../../../hooks/useStateFromProps';
import { IUserDetail } from '../../../types/user';

interface Props {
  user: IUserDetail;
  open: boolean;
  setPassword: (id: number, password: string) => void;
}

export const ChangePasswordComponent = (props: Props): JSX.Element | null => {
  const [open, setOpen] = useStateFromProp<boolean>(props.open);
  const [pwd, setPwd] = useState('');
  const [pwdRepeat, setpwdRepeat] = useState('');

  const setPassword = (): void => {
    if (props.user.id) {
      props.setPassword(props.user.id, pwd);
    }
    setOpen(false);
  }

  if (props.user && props.user.id !== -1) {
    return (
      <Modal
        style={{ width: '40%' }}
        closeIcon={true}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        >
        <Header icon='edit outline' content={`Change password for ${props.user.email}`} />
        <Modal.Content>
          <Form>
            <Form.Input
              fluid={true}
              placeholder='Password'
              name='password1'
              type='password'
              onChange={(e, data) => { setPwd(data.value) }}
            />
            <Form.Input
              error={pwd !== pwdRepeat && pwdRepeat.length === pwd.length ? { content: "Passwords don't match.", pointing: 'below' } : null}
              fluid={true}
              placeholder='Please repeat password'
              name='password2'
              type='password'
              onChange={(e, data) => { setpwdRepeat(data.value) }}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' onClick={() => setPassword()}>
            <Icon name='checkmark' /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
}
