import React, { useState } from 'react';
import { Button, Checkbox, CheckboxProps, Form, InputOnChangeData } from 'semantic-ui-react';
import { useStateFromProp } from '../../../hooks/useStateFromProps';
import { IUserDetail } from '../../../types/user';
import { ChangePasswordComponent } from './ChangePasswordComponent';

interface Props {
  user: IUserDetail;
  saveUser: (user: IUserDetail) => void;
  setPassword: (id: number, pwd: string) => void;
}

export const UserFormComponent = (props: Props): JSX.Element => {
  const [user, setUser] = useStateFromProp(props.user);
  const [open, setOpen] = useState(false);

  const handleInputChange = (data: InputOnChangeData): void => {
    setUser({...user, [data.name]: data.value});
  }

  const handleUserStatus = (data: CheckboxProps): void => {
    if (data.name) {
      setUser({...user, [data.name]: data.checked});
    }
  }

  const renderModalBtn = (): JSX.Element | null => {
    if (user && user.id !== -1) {
      return (
        <Form.Field style={{ textAlign: 'start', width: '17%' }}>
          <Button floated='left' color='red' fluid={true} size='medium' onClick={() => setOpen(true)} content='Change password' />
        </Form.Field>
      );
    }
    return null;
  }

  return (
    <React.Fragment>
      <Form style={{ textAlign: 'start' }}>
        <Form.Input
          fluid={true}
          label='User name'
          labelPosition='left'
          placeholder='User name'
          name='username'
          value={user ? user.username : ''}
          onChange={(e, data) => { handleInputChange(data) }}
        />
        <Form.Input
          fluid={true}
          label='Email'
          placeholder='Email'
          type='email'
          name='email'
          value={user ? user.email : ''}
          onChange={(e, data) => { handleInputChange(data) }}
        />
        <Form.Input
          fluid={true}
          label='Frist name'
          placeholder='Frist name'
          name='first_name'
          value={user ? user.first_name : ''}
          onChange={(e, data) => { handleInputChange(data) }}
        />
        <Form.Input
          fluid={true}
          label='Last name'
          placeholder='Last name'
          name='last_name'
          value={user ? user.last_name : ''}
          onChange={(e, data) => { handleInputChange(data) }}
        />
       <Form.Field style={{ textAlign: 'start' }}>
        <Checkbox
          name='is_active'
          label='Active'
          checked={user ? user.is_active : false}
          onChange={(e, data) => { handleUserStatus(data) }}
        />
       </Form.Field>

       <Form.Field style={{ textAlign: 'start' }}>
        <Checkbox
          name='is_staff'
          label='Staff'
          checked={user ? user.is_staff : false}
          onChange={(e, data) => { handleUserStatus(data) }}
        />
       </Form.Field>

       <Form.Field style={{ textAlign: 'start' }}>
        <Checkbox
          name='is_superuser'
          label='Superuser'
          checked={user ? user.is_superuser : false}
          onChange={(e, data) => { handleUserStatus(data) }}
        />
       </Form.Field>
       <Form.Group>
        <Form.Field style={{ textAlign: 'start', width: '10%' }}>
          <Button floated='left' color='twitter' fluid={true} size='medium' onClick={() => props.saveUser(user)} content='Save' />
        </Form.Field>
        {renderModalBtn()}
       </Form.Group>
      </Form>
      <ChangePasswordComponent user={user} open={open} setPassword={props.setPassword} />
    </React.Fragment>
  )
}
