import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { modes } from 'consts';
import { useGetTablename } from 'hooks';
import { UserContext } from 'context';

import classes from './index.module.scss';

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
            modes.map(({ id, value }) => (
              <Menu.Item key={id}>
                <NavLink to={`/${id}`}>{value}</NavLink>
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
