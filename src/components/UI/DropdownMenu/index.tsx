import { Menu } from 'antd';
import { TDropdownMenu } from '../../../types/TDropdownMenu';
import classes from './DropdownMenu.module.scss';

const DropdownMenu: React.FC<{menuItems: TDropdownMenu[]}> = ({ menuItems }) => {
  return (
    <Menu>
      {
        menuItems.map((menuItem, index) => (
          menuItem.type === 'divider' ? (
            <Menu.Divider key={`divider-${index}`}/>
          ) : (
            menuItem.type === 'submenu' ? (
              <Menu.SubMenu
                key={menuItem.key}
                title={menuItem.title}
                className={classes['dropdown-menu']}
              >
                {
                  menuItem.items && menuItem.items.map((subMenuItem) => (
                    <Menu.Item
                      key={subMenuItem.key}
                      onClick={subMenuItem.onClick}
                      icon={subMenuItem.icon}
                      className={classes['dropdown-menu']}
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
                className={classes['dropdown-menu']}
              >
                {menuItem.title}
              </Menu.Item>
            ))
          )
        )
      }
    </Menu>
  )
}

export default DropdownMenu;