import { Modal } from 'antd';
import {
  BellOutlined,
  DeleteFilled,
  EditFilled,
  ScheduleOutlined,
  ScheduleFilled
} from '@ant-design/icons';
import showConfirmModal from '../Modals/ConfirmModal';
import { TActionBody } from "../../types/TApiActionBody";
import { TData } from "../../types/TData";
import { TDropdownMenu } from "../../types/TDropdownMenu";
import { TTableParameters } from "../../types/TTableParameters";
import classes from './ActionMenu.module.scss';
import { TDictionary } from '../../types/TDictionary';
import { convertDataItem } from '../../utils/convertDataItem';
// import { TObject } from '../../types/TObject';

type TModals = 'editItem' | 'addDiscussion' | 'deleteItem';

interface IMenu {
  dataItem: TData;
  metadata: TData[] | null;
  tableParameters: TTableParameters;
  handleOpen: (t: TModals) => void;
  handleEdit: (data: TActionBody) => void;
  handleDelete: (data: TActionBody) => void;
  handleGetConnectedData: (data: TActionBody) => void;
  dictionary: TDictionary;
}

const handleDummyClick = () => {
  Modal.info({
    title: 'Информирование',
    content: 'Тестовое уведомление было отправлено'
  })
};

export const createActions = ({
    dataItem,
    metadata,
    tableParameters,
    handleOpen,
    handleEdit,
    handleDelete,
    handleGetConnectedData,
    dictionary,
  }: IMenu) => {
  const actions: TDropdownMenu[] = [];

  if (tableParameters.hasDiscussion) {
    const handleOpenAddDiscussion = () => {
      handleOpen('addDiscussion');
    }

    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-add-discussion`,
      onClick: handleOpenAddDiscussion,
      icon: <ScheduleOutlined className={classes['action-menu']}/>,
      title: 'Добавить обсуждение',
    });

    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-show-discussions`,
      onClick: () => handleGetConnectedData(dataItem),
      icon: <ScheduleFilled className={classes['action-menu']}/>,
      title: 'Проведённые обсуждения',
    });
    actions.push({ type: 'divider', key: 'divider-discussion' });
  }

  if (tableParameters.hasEditMenu) {
    const handleOpenEditMenu = () => {
      handleOpen('editItem');
    }

    actions.push({
      type: 'item',
      key: `action-menu-${dataItem.key}-edit`,
      onClick: handleOpenEditMenu,
      icon: <EditFilled className={classes['action-menu']} />,
      title: 'Редактировать',
    });
  }

  if (tableParameters.hasSetStatusMenu && metadata) {
    actions.push({
      type: 'submenu',
      key: `action-menu-${dataItem.key}-status`,
      title: 'Изменить статус',
      items: Object.entries(dictionary?.status).map(([statusKey, statusInfo]) => {
        const values = convertDataItem(dictionary, dataItem, metadata, 'table');

        return ({
          key: `action-menu-status-${statusKey}`,
          title: statusInfo.text,
          onClick: () => {
            values.status = statusKey;
            handleEdit(values);
          },
        })
      })
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
