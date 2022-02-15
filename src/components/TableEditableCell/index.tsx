import React, { useState, useEffect, useRef, useContext } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { EditableContext } from '../UI/TableEditableRow';
import { convertDataItem } from '../../utils/convertDataItem';
import { useGetTablename } from '../../utils/hooks/useGetTablename';
import { useDictionaryContext } from '../../context/DictionaryContext';
import { dataUpdateAction } from '../../storages/actions/data';
import { useMetadataSelector } from '../../storages/selectors/metadata';
import TableEditableCell from '../UI/TableEditableCell';

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  // handleSave: (record: Item) => void;
  // tablename: string,
}

const DataTableEditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  // tablename,
  ...restProps
}) => {
  const { dictionary } = useDictionaryContext();
  const {data: metadata} = useMetadataSelector();
  const tablename = useGetTablename();

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  const dispatch = useDispatch();

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const handleToggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      handleToggleEdit();
      if (metadata) {
        const data = { ...record, ...values };
        dispatch(dataUpdateAction(tablename, convertDataItem(dictionary, data, metadata, 'table')));
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  return <TableEditableCell
    title={title}
    editing={editing}
    editable={editable}
    children={children}
    dataIndex={dataIndex}
    record={record}
    handleSave={save}
    handleToggleEdit={handleToggleEdit}
    inputRef={inputRef}
    {...restProps}
  />
};

export default DataTableEditableCell;
