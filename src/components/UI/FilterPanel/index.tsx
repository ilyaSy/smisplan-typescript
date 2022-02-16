import { useCallback, useMemo, useState } from "react"
import {
  Button,
  Drawer,
  Tooltip,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Col,
  Row,
  Checkbox
} from "antd";
import { FilterOutlined, FilterFilled } from '@ant-design/icons';
import { TData } from "../../../types/TData";
import { IFormItem } from "../../../types/IFormItem";
import { useDictionaryContext } from "../../../context/DictionaryContext";
import classes from './FilterPanel.module.scss';

export const useFilterDrawer = (tableColumns: TData[], sourceData: TData[], initialVisible = false) => {
  const { dictionary } = useDictionaryContext();

  const [visibleResetButton, setVisibleResetButton] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<TData[]>();
  const [visible, setVisible] = useState<boolean>(initialVisible);
  const [form] = Form.useForm();

  const openPanel = useCallback((e: any) => {
    setVisible(true);
  }, []);

  const closePanel = useCallback(() => {
    setVisible(false);
  }, []);

  const data = useMemo(() => filterData ?? sourceData, [filterData, sourceData]);

  const handleReset = useCallback(() => {
    setFilterData(sourceData);
    setVisibleResetButton(false);
    form.resetFields();
  }, [sourceData, form]);

  const handleSubmit = useCallback((values: any) => {
    setVisibleResetButton(false);
    setFilterData(sourceData
      .filter((data: TData) => {
        return Object.keys(data).reduce((acc, key) => {
          let value = dictionary && dictionary[key] ? dictionary[key][values[key]].text : values[key];
          if (typeof data[key] === 'number') value = +value;
          if (typeof data[key] === 'boolean') value = !!value;
          if (value) setVisibleResetButton(true);
          return acc
            && (
                (typeof data[key] === 'boolean' && data[key] === value) ||
                (!value && typeof data[key] !== 'boolean') ||
                (value && data[key] && data[key] === value)
              )
        }, true)
      })
    )
    closePanel();
  }, [dictionary, sourceData, closePanel]);

  const FilterPanelButtons = useMemo<JSX.Element>(() => (
    <div>
      <Tooltip
        placement='topRight'
        title='Показать фильтры'
      >
        <Button
          onClick={openPanel}
          className={classes['filter-button']}
        >
          {
            visibleResetButton ?
            <FilterFilled style={{ fontSize: '20px' }}/> :
            <FilterOutlined style={{ fontSize: '20px' }}/>
          }
        </Button>
      </Tooltip>
      <Button
        onClick={handleReset}
        className={classes['reset-filter-button']}
        style={{display: visibleResetButton ? 'inline' : 'none'}}
      >
        Сбросить фильтры
      </Button>
    </div>
  ), [openPanel, handleReset, visibleResetButton]);

  const FilterPanel = useMemo(() => (
    <Drawer
      title='Фильтры'
      placement="right"
      onClose={closePanel}
      visible={visible}
      width={430}
    >
      <Form
        name='basic'
        preserve={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={initialValues ? initialValues : {}}
        onFinish={handleSubmit}
        form={form}
      >
        {
          tableColumns
            .filter((tableColumn) => tableColumn.isFilter)
            .map((tableColumn: TData) => {
              const formItem: IFormItem = {
                name: tableColumn.dataIndex,
                label: tableColumn.title,
                type: tableColumn.type,
                disabled: false
              }

              return (
                <Form.Item
                  key={formItem.name}
                  label={formItem.label}
                  name={formItem.name}
                  valuePropName={formItem.type === 'checkbox' ? 'checked' : 'value'}
                >
                  {
                    (['string', 'number'].includes(formItem.type)) ?
                      <Input /> :
                    formItem.type === 'fulltext' ?
                      <Input.TextArea /> :
                    formItem.type === 'checkbox' ?
                      <Checkbox value={true} /> :
                    (['select', 'multi-select'].includes(formItem.type)) && dictionary[formItem.name] ? (
                      <Select
                        allowClear
                        filterOption={(value: string, option) => RegExp(value, 'i').test(`${option?.label}`)}
                        mode={formItem.type === 'multi-select' ? 'multiple' : undefined}
                        showSearch
                        options={Object.entries(dictionary[formItem.name]).map(([value, info]) => (
                          { value, label: info.text }
                        ))}
                      />
                    ) :
                    formItem.type === 'date' ?
                      <DatePicker format="YYYY-MM-DD" /> :
                    formItem.type === 'datetime' ?
                      <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime /> :
                    formItem.type === 'time' ?
                      <TimePicker format="HH:mm:ss" /> :
                    null
                  }
                </Form.Item>
              );
            })
        }

        <Form.Item wrapperCol={{ span: 24 }} style={{marginTop: '50px'}}>
          <Row>
            <Col span={12}>
              <Button onClick={handleReset}>Сбросить</Button>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit">Применить</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  ), [
    form,
    dictionary,
    tableColumns,
    visible,
    closePanel,
    handleReset,
    handleSubmit,
  ]);

  return {
    FilterPanelButtons,
    FilterPanel,
    filterData: data
  };
}
