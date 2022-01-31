import { useCallback, useEffect, useMemo, useState } from "react"
import { Button, Drawer, Tooltip, Form, Checkbox } from "antd";
import { OrderedListOutlined } from '@ant-design/icons';
import { TData } from "../../../types/TData";
import { IFormItem } from "../../../types/IFormItem";
import classes from './ColumnsPanel.module.scss';

export const useColumnsDrawer = (metadata: TData[], initialVisible: boolean = false) => {
  const [columnsData, setColumnsData] = useState<TData[]>([]);
  const [visible, setVisible] = useState<boolean>(initialVisible);
  const [form] = Form.useForm();

  useEffect(() => {
    if (metadata) setColumnsData(metadata)
  }, [metadata]);

  const openPanel = useCallback(() => setVisible(true), []);
  const closePanel = useCallback(() => setVisible(false), []);

  const resetColumns = useCallback(() => {
    setColumnsData(metadata);
    form.setFields(metadata.map(({dataIndex, showInTable}) => ({
      name: dataIndex,
      value: showInTable,
    })));
  }, [form, metadata]);

  const handleSubmit = useCallback((values: any) => {
    setColumnsData((prev) => {
      return prev.map((columnData) => {
        return {
          ...columnData,
          showInTable: values[columnData.dataIndex] ?? false
        }
      })
    });
    closePanel();
  }, [closePanel]);

  const ColumnsPanelButtons = useMemo<JSX.Element>(() => (
    <Tooltip
      placement='topRight'
      title='Выбрать колонки'
    >
      <Button
        onClick={openPanel}
        className={classes['select-columns-button']}
        icon={<OrderedListOutlined style={{ fontSize: '20px' }}/>}
      />
    </Tooltip>
  ), [openPanel]);

  const ColumnsPanel = useMemo(() => (
    <Drawer
      title='Колонки'
      placement="right"
      onClose={closePanel}
      visible={visible}
      width={250}
    >
      <Form
        name='basic'
        preserve={false}
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 4 }}
        onFinish={handleSubmit}
        onFinishFailed={console.log}
        form={form}
      >
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button onClick={resetColumns} style={{width: '100%'}}>По умолчанию</Button>
        </Form.Item>

        {
          columnsData
            .map((columnData: TData) => {
              const formItem: IFormItem = {
                name: columnData.dataIndex,
                label: columnData.title,
                type: columnData.type,
                disabled: false,
              }

              return (
                <Form.Item
                  key={formItem.name}
                  label={formItem.label}
                  name={formItem.name}
                  valuePropName="checked"
                  initialValue={columnData.showInTable}
                  style={{marginBottom: '12px'}}
                >
                  <Checkbox value={true}/>
                </Form.Item>
              );
            })
        }

        <Form.Item wrapperCol={{ span: 24 }} style={{marginTop: '30px'}}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>Применить</Button>
        </Form.Item>

      </Form>
    </Drawer>
  ), [
    form,
    columnsData,
    visible,
    closePanel,
    resetColumns,
    handleSubmit,
  ]);

  const data = useMemo(() => (columnsData ?? []).filter((d) => d.showInTable), [columnsData]);

  return {
    ColumnsPanelButtons,
    ColumnsPanel,
    columnsData: data
  };
}
