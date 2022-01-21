import React from 'react';
import { Form, Input } from 'antd';
import classes from './TableEditableCell.module.scss';

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  inputRef: React.RefObject<Input>;
  editing: boolean;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: () => void;
  handleToggleEdit: () => void;
}

const TableEditableCell: React.FC<EditableCellProps> = ({
  title,
  inputRef,
  editing,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleToggleEdit,
  ...restProps
}) => {
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
        <Input
          ref={inputRef}
          onPressEnter={handleSave}
          onBlur={handleSave}
        />
      </Form.Item>
    ) : (
      <div
        className={classes["editable-cell-value-wrap"]}
        style={{ paddingRight: 24 }}
        onClick={handleToggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default TableEditableCell;
