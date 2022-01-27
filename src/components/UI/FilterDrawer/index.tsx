import { useCallback, useMemo, useState } from "react"
import { Button, Drawer, Tooltip, Form, Input, Select, DatePicker, TimePicker, Col, Row } from "antd";
import { FilterOutlined, FilterFilled } from '@ant-design/icons';
import { TData } from "../../../types/TData";
import { IFormItem } from "../../../types/IFormItem";
import classes from './FilterDrawer.module.scss';
import useDictionaryContext from "../../../context/DictionaryContext";

type TUseFilterDrawer = (
  tableColumns: TData[],
  sourceData: TData[],
) => {
  FilterButtons: JSX.Element,
  FilterPanel: JSX.Element,
  filterData: TData[] | undefined,
};

export const useFilterDrawer: TUseFilterDrawer = (tableColumns, sourceData) => {
  const { dictionary } = useDictionaryContext();

  const [visibleResetButton, setVisibleResetButton] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<TData[]>();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const openFilter = useCallback((e: any) => {
    setVisible(true);
  }, []);

  const closeFilter = useCallback(() => {
    setVisible(false);
  }, []);

  const data = useMemo(() => filterData ?? sourceData, [filterData, sourceData]);

  const resetFilter = useCallback(() => {
    setFilterData(sourceData);
    setVisibleResetButton(false);
    form.resetFields();
  }, [sourceData, form]);

  const submitFilter = useCallback((values: any) => {
    setVisibleResetButton(false);
    setFilterData(sourceData.filter((data: TData) => {
      return Object.keys(data).reduce((acc, key) => {
        const value = dictionary[key] ? dictionary[key][values[key]] : values[key];
        if (value) setVisibleResetButton(true);
        return acc && (!value || (value && data[key] && data[key] === value))
      }, true)
    }))
    closeFilter();
  }, [dictionary, sourceData, closeFilter]);

  const FilterButtons = useMemo<JSX.Element>(() => (
    <div>
      <Tooltip
        placement='topRight'
        title='Показать фильтры'
      >
        <Button
          onClick={openFilter}
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
        onClick={resetFilter}
        className={classes['reset-filter-button']}
        style={{visibility: visibleResetButton ? 'visible' : 'hidden'}}
      >
        Сбросить фильтры
      </Button>
    </div>
  ), [openFilter, resetFilter, visibleResetButton]);

  const FilterPanel = useMemo(() => (
    <Drawer
      title='Фильтры'
      placement="right"
      onClose={closeFilter}
      visible={visible}
      width={430}
    >
      <Form
        name='basic'
        preserve={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={initialValues ? initialValues : {}}
        onFinish={submitFilter}
        onFinishFailed={console.log}
        form={form}
      >
        {
          tableColumns
            .filter((tableColumn) => tableColumn.isFilter)
            .map((tableColumn: TData) => {
              const formItem: IFormItem = {
                name: tableColumn.id,
                label: tableColumn.title,
                type: tableColumn.type,
                disabled: false
              }

              return (
                <Form.Item
                  key={formItem.name}
                  label={formItem.label}
                  name={formItem.name}
                >
                  {
                    (formItem.type === 'string' || formItem.type === 'number') ?
                      <Input /> :
                    formItem.type === 'fulltext' ?
                      <Input.TextArea /> :
                    (formItem.type === 'select' || formItem.type === 'multi-select') && dictionary[formItem.name] ? (
                      <Select
                        allowClear
                        filterOption={(value: string, option) => RegExp(value, 'i').test(`${option?.label}`)}
                        mode={formItem.type === 'multi-select' ? 'multiple' : undefined}
                        showSearch
                        options={Object.entries(dictionary[formItem.name]).map(([value, label]) => (
                          { value, label }
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
              <Button onClick={resetFilter}>Сбросить</Button>
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
    closeFilter,
    resetFilter,
    submitFilter,
  ]);

  return {
    FilterButtons,
    FilterPanel,
    filterData: data
  };
}
