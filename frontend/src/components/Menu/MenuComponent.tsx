import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { IUserDetail } from '../../types/user'

const administrationMenu = [
  { to: '/administration/user-management', name: 'user-management', linkName: 'User Management', permissions: [] },
  { to: '/administration/email-configuration', name: 'email-configuration', linkName: 'Email Configuration', permissions: [] },
]

interface Props {
  logout: () => void;
  user: IUserDetail | null;
}

const MenuComponent = (props: Props): JSX.Element => {

  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = (name: string): void => {
    setActiveItem(name)
  }

  return (
    <Menu size='large'>
      <Menu.Menu position='right'>
        <Dropdown item text='Menu 1'>
          <Dropdown.Menu>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text='Administration' closeOnEscape={true}>
          <Dropdown.Menu >
            {administrationMenu.map((item, idx) => {
              return (
                <Menu.Item
                  key={idx}
                  as={Link}
                  to={item.to}
                  name={item.name}
                  active={activeItem === item.name}
                  onClick={() => handleItemClick(item.name)}
                  content={item.linkName}
                />
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          name='Menu 2'
          active={activeItem === 'Menu 2'}
          onClick={() => handleItemClick('Menu 2')}
        />

        <Menu.Item>
          <Button primary onClick={props.logout}>Logout</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default MenuComponent;
