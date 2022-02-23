import React from 'react';
import { Checkbox, CheckboxProps, List } from 'semantic-ui-react';
import { IUserDetail } from '../../../types/user';

interface Props {
  user: IUserDetail;
  permissions: string[];
  updatePermissions: (id: number, permissions: string[]) => void;
}

export const PermissionsComponent = (props: Props): JSX.Element => {

  const { user, permissions, updatePermissions } = props

  const containPermissions = (p: string): boolean => {
    let found = false
    if (user.permissions.includes(p)) found = true
    return found
  }

  const handlePermChecked = (data: CheckboxProps): void => {
    let per = user.permissions
    if (data.value) {
      if (data.checked) {
        per.push(data.value.toString())
      } else {
        per = per.filter(p => p !== data.value?.toString())
      }
    }
    updatePermissions(user.id, per)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', textAlign: 'start' }}>
      <List divided={true} verticalAlign='middle'>
        {permissions.map((p, idx) => {
          return (
            <List.Item key={`${p}-${idx}`}>
              <List.Content floated='left'>
                <Checkbox value={p} label={p} checked={containPermissions(p)} onChange={(e, data) => { handlePermChecked(data) }}/>
              </List.Content>
            </List.Item>
          )
        })}
      </List>
    </div>
  )
}