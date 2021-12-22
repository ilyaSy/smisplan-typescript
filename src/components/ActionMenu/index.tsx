import { Dropdown, Tooltip } from 'antd';
import { 
  CalendarFilled,
  BellOutlined,
  DeleteFilled,
  EditFilled
} from '@ant-design/icons';
import { TData } from '../../types/TData';
import { TTableParameters } from '../../types/TTableParameters';
import DropdownMenu from '../UI/DropdownMenu';
import DataEditModal from '../Modals/DataEditModal';
import { TDropdownMenu } from '../../types/TDropdownMenu';
import classes from './ActionMenu.module.scss';
import { useState } from 'react';

type TModals = 'editItem' | 'addDiscussion' | 'deleteItem';

type TActionMenu = {
  title: string,
  dataItem: TData,
  tableParameters: TTableParameters,
}

const handleMenuClick = (dataItem: TData) => (e: any) => {
  console.log('event', e);
  console.log('data', dataItem);
};

const menu = (dataItem: TData, tableParameters: TTableParameters, onOpen: (t: TModals) => void) => {
  const actions: TDropdownMenu[] = [];

  if (tableParameters.hasDiscussion) {
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-add-discussion`,
      onClick: (e) => {
        handleMenuClick(dataItem)(e);
        onOpen('addDiscussion');
      },
      icon: <CalendarFilled className={classes['action-menu']}/>,
      title: 'Добавить обсуждение',
    });
    actions.push({ type: 'divider' });
  }

  if (tableParameters.hasEditMenu) {
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-edit`,
      onClick: (e) => {
        handleMenuClick(dataItem)(e);
        onOpen('editItem');
      },
      icon: <EditFilled className={classes['action-menu']} />,
      title: 'Редактировать',
    });
  }

  if (tableParameters.hasSetStatusMenu) {
    actions.push({
      type: 'submenu',
      key: `action-menu-${dataItem.key}-status`,
      onClick: handleMenuClick(dataItem),
      title: 'Изменить статус',
      items: [
        {
          key: `action-menu-${dataItem.key}-status-1`,
          title: 'Статус 1',
          icon: <></>,
          onClick: handleMenuClick(dataItem),
        },
        {
          key: `action-menu-${dataItem.key}-status-2`,
          title: 'Статус 2',
          icon: <></>,
          onClick: handleMenuClick(dataItem),
        },
      ]
    });
  }

  if (tableParameters.hasDeleteButton) {
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-delete`,
      onClick: (e) => {
        handleMenuClick(dataItem)(e);
        onOpen('deleteItem');
      },
      icon: <DeleteFilled className={classes['action-menu']} />,
      title: 'Удалить',
    });
  }

  if (tableParameters.hasNotificationButton) {
    actions.push({ type: 'divider' });
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-notify`,
      onClick: handleMenuClick(dataItem),
      icon: <BellOutlined className={classes['action-menu']} />,
      title: 'Отправить уведомление',
    });
  }

  return <DropdownMenu menuItems={actions} />
};

const ActionMenu: React.FC<TActionMenu> = ({dataItem, title, tableParameters}) => {
  const [openModal, setOpenModal] = useState<TModals>();

  const handleClose = () => setOpenModal(undefined);

  return (
    <>
      <DataEditModal
        isOpen={openModal === 'editItem'}
        onEditHandler={handleMenuClick}
        onClose={handleClose}
      />

      <Tooltip
        placement='topRight'
        title={title}
        >
        <Dropdown.Button
          overlay={menu(dataItem, tableParameters, (t: TModals) => { setOpenModal(t) })}
          trigger={['click']}
          />
      </Tooltip>
    </>
  );
};

export default ActionMenu;
