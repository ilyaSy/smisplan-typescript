import { memo } from 'react';
import { Menu, Tooltip } from 'antd';
import {
  PrinterOutlined,
  SettingOutlined,
  EyeInvisibleOutlined,
  // PlusCircleFilled,
  PlusCircleTwoTone
} from '@ant-design/icons';
import classes from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <Menu
      mode='vertical'
      theme='dark'
      className={classes.sidebar}
    >
      <Menu.Item
        className={classes["menu-item"]}
      >
        <Tooltip
          placement="bottomLeft"
          title="Добавить"
          className="tooltip"
        >
          <PlusCircleTwoTone style={{fontSize: "30px"}} twoToneColor="#52c41a" />
        </Tooltip>
      </Menu.Item>

      <Menu.Item
        className={classes["menu-item"]}
      >
        <Tooltip
          placement="bottomLeft"
          title="Печать в PDF"
          className="tooltip"
        >
          <PrinterOutlined style={{fontSize: "30px"}} />
        </Tooltip>
      </Menu.Item>

      <Menu.SubMenu
        className={classes["menu-submenu"]}
        icon={<SettingOutlined style={{fontSize: "30px"}} />}
      >
        <Menu.Item>Цветовая тема</Menu.Item>
        <Menu.Item>Колонки</Menu.Item>
        <Menu.Item>Инструкция</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item
        className={classes["menu-item"]}
      >
        <Tooltip
          placement="bottomLeft"
          title="Сбросить все фильтры"
          className="tooltip"
        >
          <EyeInvisibleOutlined style={{fontSize: "30px"}} />
        </Tooltip>
      </Menu.Item>
    </Menu>
  );
};

export default memo(Sidebar);
