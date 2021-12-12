import { Menu } from 'antd';
import { TDropdownMenu } from '../../../types/TDropdownMenu';
import classes from './DropdownMenu.module.scss';

const DropdownMenu: React.FC<{actions: TDropdownMenu[]}> = ({ actions }) => {
  return (
    <Menu>
      {
        actions.map((action, index) => (
          action.type === 'divider' ? (
            <Menu.Divider key={`divider-${index}`}/>
          ) : (
            action.type === 'submenu' ? (
              <Menu.SubMenu
                key={action.key}
                title={action.title}
                className={classes['dropdown-menu']}
              >
                {
                  action.items && action.items.map((subaction) => (
                    <Menu.Item
                      key={subaction.key}
                      onClick={subaction.onClick}
                      icon={subaction.icon}
                      className={classes['dropdown-menu']}
                    >
                      {subaction.title}
                    </Menu.Item>
                  ))
                }
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={action.key}
                onClick={action.onClick}
                icon={action.icon}
                className={classes['dropdown-menu']}
              >
                {action.title}
              </Menu.Item>
            ))
          )
        )
      }
    </Menu>
  )
}

export default DropdownMenu;