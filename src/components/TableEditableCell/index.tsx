import React, { useState, useEffect, useRef, useContext, ReactElement } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { EditableContext } from '../UI/TableEditableRow';
import { convertDataItem } from '../../utils/convertDataItem';
import useGetTablename from '../../utils/hooks/useGetTablename';
import useDictionaryContext from '../../context/DictionaryContext';
import { dataUpdateAction } from '../../storages/actions/data';
import useMetadataSelector from '../../storages/selectors/metadata';
import classes from './TableEditableCell.module.scss';

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const TableEditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
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

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      if (metadata) {
        const data = { ...record, ...values };
        dispatch(dataUpdateAction(tablename, convertDataItem(dictionary, data, metadata, 'table')));
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={ dataIndex }
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className={classes["editable-cell-value-wrap"]} style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default TableEditableCell;
