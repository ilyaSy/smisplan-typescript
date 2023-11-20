import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Tooltip, Form, Checkbox } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';

import { TData, IFormItem, TColumn } from 'interfaces';

import classes from './index.module.scss';

export const useColumnsDrawer = (metadata: TColumn<any>[], initialVisible: boolean = false) => {
  const [columnsData, setColumnsData] = useState<TColumn<any>[]>([]);
  const [visible, setVisible] = useState<boolean>(initialVisible);
  const [form] = Form.useForm();

  useEffect(() => {
    if (metadata) setColumnsData(metadata);
  }, [metadata]);

  const resetColumns = useCallback(() => {
    setColumnsData(metadata);
    form.setFields(metadata.map(({ dataIndex, showInTable }) => ({
      name: dataIndex as string,
      value: showInTable,
    })));
  }, [form, metadata]);

  const handleSubmit = useCallback((values: any) => {
    setColumnsData((prev) => prev.map((columnData) => ({
      ...columnData,
      showInTable: values[columnData.dataIndex] ?? false,
    })));

    setVisible(false);
  }, []);

  const ColumnsPanelButtons = useMemo<JSX.Element>(() => (
    <Tooltip
      placement='topRight'
      title='Выбрать колонки'
    >
      <Button
        onClick={() => setVisible(true)}
        className={classes['select-columns-button']}
        icon={<OrderedListOutlined style={{ fontSize: '20px' }}/>}
      />
    </Tooltip>
  ), []);

  const ColumnsPanel = useMemo(() => (
    <Drawer
      title='Колонки'
      placement='right'
      onClose={() => setVisible(false)}
      visible={visible}
      width={250}
    >
      <Form
        name='basic'
        preserve={false}
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 4 }}
        onFinish={handleSubmit}
        onFinishFailed={console.info}
        form={form}
      >
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button onClick={resetColumns} style={{ width: '100%' }}>По умолчанию</Button>
        </Form.Item>

        {
          columnsData
            .map((columnData: TData) => {
              const formItem: IFormItem = {
                name: columnData.dataIndex,
                label: columnData.title,
                type: columnData.type,
                disabled: false,
              };

              return (
                <Form.Item
                  key={formItem.name}
                  label={formItem.label}
                  name={formItem.name}
                  valuePropName="checked"
                  initialValue={columnData.showInTable}
                  style={{ marginBottom: '12px' }}
                >
                  <Checkbox value={true}/>
                </Form.Item>
              );
            })
        }

        <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: '30px' }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Применить</Button>
        </Form.Item>

      </Form>
    </Drawer>
  ), [
    form,
    columnsData,
    visible,
    resetColumns,
    handleSubmit,
  ]);

  const data = useMemo(() => (columnsData ?? []).filter((d) => d.showInTable), [columnsData]);

  return {
    ColumnsPanelButtons,
    ColumnsPanel,
    columnsData: data,
  };
};
