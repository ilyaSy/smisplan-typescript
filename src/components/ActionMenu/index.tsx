import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Tooltip } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';

import { TData, TTableParameters, TActionBody } from 'types';
import { Api } from 'utils';
import { createActions } from './utils';
import { useMetadataSelector } from 'storages/selectors';
import { useDictionaryContext } from 'context/DictionaryContext';
import { dataAddAction, dataDeleteAction, dataUpdateAction } from 'storages/actions/data';
import DropdownMenu from 'components/UI/DropdownMenu';
import ModalWithList from 'components/UI/ModalWithList';
import DataEditModal from 'components/Modals/DataEditModal';
import DataAddModal from 'components/Modals/DataAddModal';

type TModals = 'editItem' | 'addDiscussion' | 'deleteItem';

type TActionMenu = {
  title: string,
  dataItem: TData,
  tableParameters: TTableParameters,
  tablename: string,
};

const ActionMenu: React.FC<TActionMenu> = ({ dataItem, title, tableParameters, tablename }) => {
  const { dictionary } = useDictionaryContext();

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<TModals>();

  const { data: metadata } = useMetadataSelector();

  const handleClose = () => setOpenModal(undefined);
  const handleOpen = (t: TModals) => {
    setOpenModal(t);
  };

  const handleEdit = (data: TActionBody) => dispatch(dataUpdateAction(tablename, data));
  const handleDelete = (data: TActionBody) => dispatch(dataDeleteAction(tablename, data));
  const handleAdd = (data: TActionBody) => {
    delete data.id;
    dispatch(dataAddAction(tablename, data));
  };

  const handleAddDiscussion = (data: TActionBody) => {
    dispatch(dataAddAction('discussion', data));
  };

  const connectedTablename = 'discussion';
  const handleGetConnectedData = useCallback(async (data: TActionBody) => {
    const connectedData = await Api.getConnectedData(tablename, connectedTablename, +data.id);

    if (connectedData) {
      ModalWithList({
        title: 'Обсуждения',
        avatar: <CarryOutOutlined />,
        dataSource: connectedData as { title: string, description: string }[],
        noDataText: 'Ранее обсуждений не проводилось',
      });
    }
  }, [tablename]);

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
            mainQuestions: dataItem.description,
          }}
        />

        <Tooltip placement='topRight' title={title}>
          <React.StrictMode> {/* fix for warning from AntDesign in console log */}
            <Dropdown.Button
              overlay={<DropdownMenu menuItems={actions} />}
              trigger={['click']}
            />
          </React.StrictMode>
        </Tooltip>
      </>
    ) : null
  );
};

export default ActionMenu;
