import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Tooltip } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';
import axios from 'axios';
import { TData } from '../../types/TData';
import { TTableParameters } from '../../types/TTableParameters';
import { TActionBody } from '../../types/TApiActionBody';
import { IFetchError } from '../../types/IFetchError';
import { useMetadataSelector } from '../../storages/selectors/metadata';
import { dataAddAction, dataDeleteAction, dataUpdateAction } from '../../storages/actions/data';
import { createActions } from './createActions';
import DropdownMenu from '../UI/DropdownMenu';
import Notification from '../UI/Notification';
import DataEditModal from '../Modals/DataEditModal';
import DataAddModal from '../Modals/DataAddModal';
import { urlApi } from '../../constants/constants';
import { useDictionaryContext } from '../../context/DictionaryContext';
import ModalWithList from '../UI/ModalWithList';

type TModals = 'editItem' | 'addDiscussion' | 'deleteItem';

type TActionMenu = {
  title: string,
  dataItem: TData,
  tableParameters: TTableParameters,
  tablename: string,
};

const ActionMenu: React.FC<TActionMenu> = ({dataItem, title, tableParameters, tablename}) => {
  const { dictionary } = useDictionaryContext();

  const [openModal, setOpenModal] = useState<TModals>();

  const { data: metadata } = useMetadataSelector();

  const handleClose = () => setOpenModal(undefined);
  const handleOpen = (t: TModals) => {
    setOpenModal(t);
  }

  const handleEdit = (data: TActionBody) => dispatch(dataUpdateAction(tablename, data));
  const handleDelete = (data: TActionBody) => dispatch(dataDeleteAction(tablename, data));
  const handleAdd = (data: TActionBody) => {
    delete data.id;
    dispatch(dataAddAction(tablename, data));
  }

  const handleAddDiscussion = (data: TActionBody) => {
    dispatch(dataAddAction('discussion', data));
  }

  const connectedTablename = 'discussion';
  const handleGetConnectedData = useCallback(async (data: TActionBody) => {
    try {
      const response = await axios.get(`${urlApi}/${tablename}/get-${connectedTablename}/${data.id}`);

      ModalWithList({
        title: 'Обсуждения',
        avatar: <CarryOutOutlined />,
        dataSource: response.data as {title: string, description: string}[],
        noDataText: 'Ранее обсуждений не проводилось',
      });
    } catch (error) {
      Notification({
        type: 'error',
        message: 'Ошибка при загрузке данных',
        description: (error as IFetchError).message
          ? (error as IFetchError).message
          : (error as IFetchError).statusText,
      });
    }
  }, [tablename]);

  const dispatch = useDispatch();

  const actions = createActions({
    dataItem,
    dictionary,
    metadata,
    tableParameters,
    handleOpen,
    handleDelete,
    handleEdit,
    handleGetConnectedData,
  });

  return (
    actions.length ? (
      <>
        <DataEditModal
          isOpen={openModal === 'editItem'}
          onEditHandler={handleEdit}
          onAddHandler={handleAdd}

          onClose={handleClose}
          formData={dataItem}
        />

        <DataAddModal
          isOpen={openModal === 'addDiscussion'}
          onAddHandler={handleAddDiscussion}
          onClose={handleClose}
          modalTablename='discussion'
          modalInitialValues={{
            theme: dataItem.text,
            mainQuestions: dataItem.description
          }}
        />

        <Tooltip placement='topRight' title={title}>
          <Dropdown.Button
            overlay={<DropdownMenu menuItems={actions} />}
            trigger={['click']}
          />
        </Tooltip>
      </>
    ) : null
  );
};

export default ActionMenu;
