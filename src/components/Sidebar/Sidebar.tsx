import { memo, useState } from 'react';
import { Menu, Tooltip } from 'antd';
import {
  PrinterOutlined,
  SettingOutlined,
  EyeInvisibleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import DataAddModal from '../Modals/DataAddModal';
import showConfirmModal from '../Modals/ConfirmModal';
import classes from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const [sidebarAction, setSidebarAction] = useState<string>('');

  const handleAddData = () => {
    setSidebarAction('addData');
    // showConfirmModal({
    //   onOk: () => console.log('Добавить данные'),
    //   onCancel: () => console.log('Удалить данные'),
    //   onFinally: () => setSidebarAction(''),
    //   description: 'Добавление данных!',
    // });
  };

  return (
    <Menu
      mode='vertical'
      theme='dark'
      className={classes.sidebar}
      selectedKeys={[sidebarAction]}
    >
      <DataAddModal
        isOpen={sidebarAction === 'addData'}
        onAddHandler={console.dir}
        onClose={() => setSidebarAction('')}
      />

      <Menu.Item key='addData' className={classes['menu-item']}>
        <Tooltip placement='bottomLeft' title='Добавить' className='tooltip'>
          <PlusCircleTwoTone
            className={classes['add-icon']}
            style={{ fontSize: '30px' }}
            twoToneColor='#52c41a'
            onClick={handleAddData}
          />
        </Tooltip>
      </Menu.Item>

      <Menu.Item key='printPDF' className={classes['menu-item']}>
        <Tooltip
          placement='bottomLeft'
          title='Печать в PDF'
          className='tooltip'
        >
          <PrinterOutlined style={{ fontSize: '30px' }} />
        </Tooltip>
      </Menu.Item>

      <Menu.SubMenu key='settings'
        className={classes['menu-submenu']}
        icon={<SettingOutlined style={{ fontSize: '30px' }} />}
      >
        <Menu.Item>Цветовая тема</Menu.Item>
        <Menu.Item>Колонки</Menu.Item>
        <Menu.Item>Инструкция</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key='resetFilters' className={classes['menu-item']}>
        <Tooltip
          placement='bottomLeft'
          title='Сбросить все фильтры'
          className='tooltip'
        >
          <EyeInvisibleOutlined style={{ fontSize: '30px' }} />
        </Tooltip>
      </Menu.Item>
    </Menu>
  );
};

export default memo(Sidebar);
