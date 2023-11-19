import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';

import { convertDataItem } from 'utils';
import { useGetTablename } from 'hooks';
import { useDictionaryContext } from 'context';
import { useMetadataSelector } from 'storages/selectors';
import { dataUpdateAction } from 'storages/actions/data';
import { EditableContext } from 'components/UI/TableEditableRow';
import TableEditableCell from 'components/UI/TableEditableCell';

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
  const { data: metadata } = useMetadataSelector();
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
      console.info('Save failed:', errInfo);
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
  />;
};

export default DataTableEditableCell;
