import { Dropdown, Tooltip } from 'antd';
import {
  CalendarFilled,
  BellOutlined,
  DeleteFilled,
  EditFilled
} from '@ant-design/icons';
import DropdownMenu from '../UI/DropdownMenu';
import DataEditModal from '../Modals/DataEditModal';
import { TData } from '../../types/TData';
import { TTableParameters } from '../../types/TTableParameters';
import { TDropdownMenu } from '../../types/TDropdownMenu';
import classes from './ActionMenu.module.scss';
import { useState } from 'react';
import showConfirmModal from '../Modals/ConfirmModal';
import { useDispatch } from 'react-redux';
import { dataDeleteAction, dataUpdateAction } from '../../storages/actions/data';
import useGetTablename from '../../utils/hooks/useGetTablename';
import TActionBody from '../../types/TApiActionBody';

type TModals = 'editItem' | 'addDiscussion' | 'deleteItem';

type TActionMenu = {
  title: string,
  dataItem: TData,
  tableParameters: TTableParameters,
};

interface IMenu {
  dataItem: TData;
  tableParameters: TTableParameters;
  handleOpen: (t: TModals) => void;
  handleDelete: (data: TActionBody) => void;
}

const handleMenuClick = (dataItem: TData) => {
  console.log('data', dataItem);
};

const menu = ({ dataItem, tableParameters, handleOpen, handleDelete }: IMenu) => {
  const actions: TDropdownMenu[] = [];

  if (tableParameters.hasDiscussion) {
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-add-discussion`,
      onClick: (e) => {
        console.log(e);
        handleMenuClick(dataItem);
        handleOpen('addDiscussion');
      },
      icon: <CalendarFilled className={classes['action-menu']}/>,
      title: 'Добавить обсуждение',
    });
    actions.push({ type: 'divider', key: 'divider-discussion' });
  }

  if (tableParameters.hasEditMenu) {
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-edit`,
      onClick: (e) => {
        console.log(e);
        handleMenuClick(dataItem);
        handleOpen('editItem');
      },
      icon: <EditFilled className={classes['action-menu']} />,
      title: 'Редактировать',
    });
  }

  if (tableParameters.hasSetStatusMenu) {
    actions.push({
      type: 'submenu',
      key: `action-menu-${dataItem.key}-status`,
      title: 'Изменить статус',
      items: [
        {
          key: `action-menu-${dataItem.key}-status-1`,
          title: 'Статус 1',
          icon: <></>,
          onClick: handleMenuClick,
        },
        {
          key: `action-menu-${dataItem.key}-status-2`,
          title: 'Статус 2',
          icon: <></>,
          onClick: handleMenuClick,
        },
      ]
    });
  }

  if (tableParameters.hasDeleteButton) {
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-delete`,
      onClick: () => {
        showConfirmModal({
          onOk: () => handleDelete(dataItem),
          onCancel: () => console.log(''),
          description: 'Вы подтверждаете удаление данных ?',
        });
      },
      icon: <DeleteFilled className={classes['action-menu']} />,
      title: 'Удалить',
    });
  }

  if (tableParameters.hasNotificationButton) {
    actions.push({ type: 'divider', key: 'divider-notification' });
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-notify`,
      onClick: handleMenuClick,
      icon: <BellOutlined className={classes['action-menu']} />,
      title: 'Отправить уведомление',
    });
  }

  return <DropdownMenu menuItems={actions} />
};

const ActionMenu: React.FC<TActionMenu> = ({dataItem, title, tableParameters}) => {
  const [openModal, setOpenModal] = useState<TModals>();

  const tablename = useGetTablename();

  const handleClose = () => setOpenModal(undefined);
  const handleOpen = (t: TModals) => {
    setOpenModal(t);
  }

  const handleEdit = (data: TActionBody) => {
    dispatch(dataUpdateAction(tablename, data));
  };

  const handleDelete = (data: TActionBody) => {
    dispatch(dataDeleteAction(tablename, data));
  }

  const dispatch = useDispatch();

  return (
    <>
      <DataEditModal
        isOpen={openModal === 'editItem'}
        onEditHandler={handleEdit}
        onClose={handleClose}
        formData={dataItem}
      />

      <Tooltip
        placement='topRight'
        title={title}
        >
        <Dropdown.Button
          overlay={menu({ dataItem, tableParameters, handleOpen, handleDelete })}
          trigger={['click']}
          />
      </Tooltip>
    </>
  );
};

export default ActionMenu;
