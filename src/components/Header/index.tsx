import { useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { modes } from '../../constants/constants';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import { useGetTablename } from '../../utils/hooks/useGetTablename';
import classes from './Header.module.scss';

const Header: React.FC = () => {
  const mode = useGetTablename();
  const userContext = useContext(UserContext);

  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <Menu
          selectedKeys={[mode]}
          mode='horizontal'
          theme='dark'
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

      <Menu
        mode='horizontal'
        theme='dark'
        className={classes['header-login']}
      >
        <Menu.SubMenu
          icon={<UserOutlined />}
          title={userContext.user?.name}
          key='user-options'
        >
          <Menu.Item
            key='logout'
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
