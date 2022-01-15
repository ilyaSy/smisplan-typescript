import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Tooltip } from 'antd';
import DataEditModal from '../Modals/DataEditModal';
import { TData } from '../../types/TData';
import { TTableParameters } from '../../types/TTableParameters';
import TActionBody from '../../types/TApiActionBody';
import { dataAddAction, dataDeleteAction, dataUpdateAction } from '../../storages/actions/data';
import useGetTablename from '../../utils/hooks/useGetTablename';
import { createActions } from './createActions';
import DropdownMenu from '../UI/DropdownMenu';

type TModals = 'editItem' | 'addDiscussion' | 'deleteItem';

type TActionMenu = {
  title: string,
  dataItem: TData,
  tableParameters: TTableParameters,
};

const ActionMenu: React.FC<TActionMenu> = ({dataItem, title, tableParameters}) => {
  const [openModal, setOpenModal] = useState<TModals>();

  const tablename = useGetTablename();

  const handleClose = () => setOpenModal(undefined);
  const handleOpen = (t: TModals) => {
    setOpenModal(t);
  }

  const handleEdit = (data: TActionBody) => dispatch(dataUpdateAction(tablename, data));
  const handleDelete = (data: TActionBody) => dispatch(dataDeleteAction(tablename, data));
  const handleAdd = (data: TActionBody) => {
    delete data.id;
    console.log(data);

    dispatch(dataAddAction(tablename, data));
  }

  const dispatch = useDispatch();

  const actions = createActions({ dataItem, tableParameters, handleOpen, handleDelete });

  return (
    <>
      <DataEditModal
        isOpen={openModal === 'editItem'}
        onEditHandler={handleEdit}
        onAddHandler={handleAdd}

        onClose={handleClose}
        formData={dataItem}
      />

      <Tooltip
        placement='topRight'
        title={title}
        >
          <Dropdown.Button
            overlay={ <DropdownMenu menuItems={actions} /> }
            trigger={['click']}
          />
      </Tooltip>
    </>
  );
};

export default ActionMenu;
