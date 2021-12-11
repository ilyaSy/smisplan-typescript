import { useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { modes } from '../../constants/constants';
import { UserContext } from '../../context/UserContext';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const userContext = useContext(UserContext);

  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <Menu
          defaultSelectedKeys={[modes[0].id]}
          mode='horizontal'
          theme='dark'
          inlineCollapsed={false}
        >
          {
            modes.map((mode) => (
              <Menu.Item key={mode.id}>
                <NavLink to={`/${mode.id}`}>{mode.value}</NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      </nav>

      <Menu theme='dark' mode='horizontal'>
        <Menu.SubMenu
          icon={<UserOutlined />}
          title={userContext.user?.name}
        >
          <Menu.Item
            className={classes.logout}
            icon={<LogoutOutlined />}
          >
            Выход
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </header>
  );
};

export default Header;
