import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Menu, Tooltip } from 'antd';
import {
  PrinterOutlined,
  SettingOutlined,
  EyeInvisibleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import DataAddModal from '../Modals/DataAddModal';
// import showConfirmModal from '../Modals/ConfirmModal';
import {dataAddAction} from "../../storages/actions/data";
import classes from './Sidebar.module.scss';
import useGetTablename from "../../utils/hooks/useGetTablename";
import useDataSelector from "../../storages/selectors/data";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [sidebarAction, setSidebarAction] = useState<string>('');

  const tablename = useGetTablename();

  const {isError: isErrorData, isLoading: isLoadingData} = useDataSelector();

  const handleAddData = () => {
    setSidebarAction('addData');
  };

  const handleCloseModal = () => {
    setSidebarAction('');
  }

  useEffect(() => {
    if (!isErrorData && !isLoadingData) handleCloseModal();
  }, [isErrorData, isLoadingData])

  return (
    <Menu
      mode='vertical'
      theme='dark'
      className={classes.sidebar}
      selectedKeys={[sidebarAction]}
    >
      <DataAddModal
        isOpen={sidebarAction === 'addData'}
        onAddHandler={(data) => {
          dispatch(dataAddAction(tablename, data));
        }}
        onClose={handleCloseModal}
      />

      <Menu.Item key='addData' className={classes['sidebar__menu-item']}>
        <Tooltip placement='bottomLeft' title='Добавить' className='tooltip'>
          <PlusCircleTwoTone
            className={classes['sidebar__add-icon']}
            style={{ fontSize: '30px' }}
            twoToneColor='#52c41a'
            onClick={handleAddData}
          />
        </Tooltip>
      </Menu.Item>

      <Menu.Item key='printPDF' className={classes['sidebar__menu-item']}>
        <Tooltip
          placement='bottomLeft'
          title='Печать в PDF'
          className='tooltip'
        >
          <PrinterOutlined style={{ fontSize: '30px' }} />
        </Tooltip>
      </Menu.Item>

      <Menu.SubMenu key='settings'
        className={classes['sidebar__menu-submenu']}
        icon={<SettingOutlined style={{ fontSize: '30px' }} />}
      >
        <Menu.Item>Цветовая тема</Menu.Item>
        <Menu.Item>Колонки</Menu.Item>
        <Menu.Item>Инструкция</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key='resetFilters' className={classes['sidebar__menu-item']}>
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
