import { useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
// import { IconName } from "react-icons/md";
import { UserContext } from '../../context/UserContext';
import classes from './Header.module.scss';

const Header = () => {
  const userContext = useContext(UserContext);

  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <Menu
          defaultSelectedKeys={['1']}
          mode='horizontal'
          theme='dark'
          inlineCollapsed={false}
        >
          <Menu.Item>Задачи</Menu.Item>
          <Menu.Item>Совещания</Menu.Item>
          <Menu.Item>Календарь</Menu.Item>
          <Menu.Item>Изменения</Menu.Item>
        </Menu>
      </nav>

      <Menu theme='dark' mode='horizontal'>
        <Menu.SubMenu
          icon={<UserOutlined />}
          title="Сычугов"
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
