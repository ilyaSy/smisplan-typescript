import {CalendarFilled, BellOutlined, DeleteFilled, EditFilled} from '@ant-design/icons';
import showConfirmModal from '../Modals/ConfirmModal';
import TActionBody from "../../types/TApiActionBody";
import { TData } from "../../types/TData";
import { TDropdownMenu } from "../../types/TDropdownMenu";
import { TTableParameters } from "../../types/TTableParameters";
import classes from './ActionMenu.module.scss';

type TModals = 'editItem' | 'addDiscussion' | 'deleteItem';

interface IMenu {
  dataItem: TData;
  tableParameters: TTableParameters;
  handleOpen: (t: TModals) => void;
  handleDelete: (data: TActionBody) => void;
}

const handleDummyClick = (dataItem: TData) => {
  console.log('data', dataItem);
};

export const createActions = ({ dataItem, tableParameters, handleOpen, handleDelete }: IMenu) => {
  const actions: TDropdownMenu[] = [];

  if (tableParameters.hasDiscussion) {
    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-add-discussion`,
      onClick: (e) => {
        console.log(e);
        handleDummyClick(dataItem);
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
        handleDummyClick(dataItem);
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
          onClick: handleDummyClick,
        },
        {
          key: `action-menu-${dataItem.key}-status-2`,
          title: 'Статус 2',
          icon: <></>,
          onClick: handleDummyClick,
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
      onClick: handleDummyClick,
      icon: <BellOutlined className={classes['action-menu']} />,
      title: 'Отправить уведомление',
    });
  }

  return actions;
}
