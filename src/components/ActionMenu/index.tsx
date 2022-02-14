import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Tooltip } from 'antd';
import DataEditModal from '../Modals/DataEditModal';
import { TData } from '../../types/TData';
import { TTableParameters } from '../../types/TTableParameters';
import TActionBody from '../../types/TApiActionBody';
import { dataAddAction, dataDeleteAction, dataUpdateAction } from '../../storages/actions/data';
import { createActions } from './createActions';
import DropdownMenu from '../UI/DropdownMenu';
import useDictionaryContext from '../../context/DictionaryContext';
import useMetadataSelector from '../../storages/selectors/metadata';
import DataAddModal from '../Modals/DataAddModal';

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

  const dispatch = useDispatch();

  const actions = createActions({
    dataItem,
    dictionary,
    metadata,
    tableParameters,
    handleOpen,
    handleDelete,
    handleEdit
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
