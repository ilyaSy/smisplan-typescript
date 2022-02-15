import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Menu, Tooltip } from 'antd';
import {
  SettingOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';
import DataAddModal from '../Modals/DataAddModal';
import {dataAddAction} from "../../storages/actions/data";
import { useGetTablename } from "../../utils/hooks/useGetTablename";
import { useDataSelector } from "../../storages/selectors/data";
import { PrintPDF } from '../UI/PrintPDF';
import classes from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [sidebarAction, setSidebarAction] = useState<string>('');

  const tablename = useGetTablename();

  const {isError: isErrorData, isLoading: isLoadingData} = useDataSelector();

  const handleAddData = () => setSidebarAction('addData');

  const handleCloseModal = () => setSidebarAction('');

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
        <PrintPDF />
      </Menu.Item>

      <Menu.SubMenu key='settings'
        className={classes['sidebar__menu-submenu']}
        icon={<SettingOutlined style={{ fontSize: '30px' }} />}
      >
        <Menu.Item key='color-scheme'>Цветовая тема</Menu.Item>
        <Menu.Item key='manual'>Инструкция</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default memo(Sidebar);
