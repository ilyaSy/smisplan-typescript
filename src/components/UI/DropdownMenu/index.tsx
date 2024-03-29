import React from 'react';
import { Menu } from 'antd';

import { TDropdownMenu } from 'interfaces';

import classes from './index.module.scss';
import './index.css';

const DropdownMenu: React.FC<{ menuItems: TDropdownMenu[] }> = ({ menuItems }) => (
  <Menu
    className={classes['dropdown-menu']}
    defaultSelectedKeys={[]}
    selectedKeys={[]}
    activeKey="something"
  >
    {
      menuItems.map((menuItem, index) => (
        menuItem.type === 'divider' ? (
          <Menu.Divider key={`divider-${index}`}/>
        ) : (
          menuItem.type === 'submenu' ? (
            <Menu.SubMenu
              key={menuItem.key}
              title={menuItem.title}
            >
              {
                menuItem.items && menuItem.items.map((subMenuItem) => (
                  <Menu.Item
                    key={subMenuItem.key}
                    onClick={subMenuItem.onClick}
                    icon={subMenuItem.icon}
                  >
                    {subMenuItem.title}
                  </Menu.Item>
                ))
              }
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={menuItem.key}
              onClick={menuItem.onClick}
              icon={menuItem.icon}
            >
              {menuItem.title}
            </Menu.Item>
          ))
      ),
      )
    }
  </Menu>
);

export default DropdownMenu;
