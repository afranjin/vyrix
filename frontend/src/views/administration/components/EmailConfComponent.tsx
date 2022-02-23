import React from 'react'
import { Button, Form, InputOnChangeData } from 'semantic-ui-react'
import { useStateFromProp } from '../../../hooks/useStateFromProps'
import { IMailConfiguration } from '../../../types/configuration'

interface Props {
  conf: IMailConfiguration;
  saveEmailConf: (conf: IMailConfiguration) => void;
}

export const EmailConfComponent = (props: Props): JSX.Element => {

  const[conf, setConf] = useStateFromProp(props.conf);

  const handleInputChange = (data: InputOnChangeData): void => {
    setConf({...conf, [data.name]: data.value});
  }

  const handleSave = (): void => {
    props.saveEmailConf(conf);
  }

  return (
    <React.Fragment>
      <Form style={{ textAlign: 'start' }}>
        <Form.Input
          fluid={true}
          placeholder='Sender Mail'
          label='Sender Mail'
          name='SenderAddress'
          value={conf ? conf.SenderAddress : ''}
          onChange={(e, data) => {handleInputChange(data)}}
        />
        <Form.Input
          fluid={true}
          placeholder='Sender Password'
          label='Sender Password'
          type='password'
          name='SenderPassword'
          value={conf ? conf.SenderPassword : ''}
          onChange={(e, data) => {handleInputChange(data)}}
        />
        <Form.Input
          fluid={true}
          placeholder='SMTP Host'
          label='SMTP Host'
          name='SMTPHost'
          value={conf ? conf.SMTPHost : ''}
          onChange={(e, data) => {handleInputChange(data)}}
        />
        <Form.Input
          fluid={true}
          placeholder='SMTP Port'
          label='SMTP Port'
          name='SMTPPort'
          value={conf ? conf.SMTPPort : ''}
          onChange={(e, data) => {handleInputChange(data)}}
        />
       <Form.Field style={{ textAlign: 'start', width: '10%' }}>
        <Button floated='left' color='twitter' fluid={true} size='medium' onClick={(e) => handleSave()} content='Save' />
       </Form.Field>
      </Form>
    </React.Fragment>
  )
}
