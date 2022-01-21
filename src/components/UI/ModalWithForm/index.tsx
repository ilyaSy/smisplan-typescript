import React from "react";
import { Modal, Form, Input, Button, DatePicker, TimePicker, Select } from 'antd';
import useDictionaryContext from '../../../context/DictionaryContext';
import { IFormItem } from '../../../types/IFormItem';
import { IModalWithForm } from '../../../types/IModalWithForm';
import { convertDataItem } from '../../../utils/convertDataItem';

const ModalWithForm: React.FC<IModalWithForm> = ({
  title,
  okButtonTitle = 'Сохранить',
  isOpen,
  handleOk,
  handleClose,
  formItems,
  additionalButtons,
  initialValues
}) => {
  const [form] = Form.useForm();

  const { dictionary } = useDictionaryContext();

  const onOk =
    (callback: (values: any) => void) =>
    () => {
      form
        .validateFields()
        .then((values) => {
          values = convertDataItem(dictionary, values, formItems, 'form');

          callback(values);
        })
        .catch(console.log)
    };

  return (
    isOpen ? (
      <Modal
        title={title}
        visible={isOpen}
        onOk={onOk(handleOk)}
        onCancel={handleClose}
        footer={[
          <Button key='ModalWithForm-cancel-button' type="primary" danger onClick={handleClose}>Отмена</Button>,

          additionalButtons.map(({title, onClick}) => (
            <Button
              key={`ModalWithForm-${title}-button`}
              onClick={onOk(onClick)}
            >
              {title}
            </Button>
          )),

          <Button key='ModalWithForm-ok-button' type="primary" onClick={onOk(handleOk)}>{okButtonTitle}</Button>,
        ]}
      >
        <Form
          name='basic'
          preserve={false}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={initialValues ? initialValues : {}}
          onFinish={console.log}
          onFinishFailed={console.log}
          form={form}
        >
          {
            formItems.map((formItem: IFormItem) => (
              <Form.Item
                key={formItem.name}
                label={formItem.label}
                name={formItem.name}
                rules={formItem.rules}
              >
                {
                  (formItem.type === 'string' || formItem.type === 'number')
                  ? (
                    <Input
                      disabled={formItem.disabled}
                    />
                  ) :
                  formItem.type === 'fulltext'
                  ? (
                    <Input.TextArea
                      disabled={formItem.disabled}
                    />
                  ) :
                  (formItem.type === 'select' || formItem.type === 'multi-select')
                  ? (
                    <Select
                      disabled={formItem.disabled}
                      allowClear
                      filterOption={(value: string, option) => RegExp(value, 'i').test(`${option?.label}`)}
                      mode={formItem.type === 'multi-select' ? 'multiple' : undefined}
                      showSearch
                      options={Object.entries(dictionary[formItem.name]).map(([value, label]) => (
                        { value, label }
                      ))}
                    />
                  ) :
                  formItem.type === 'date' ? (
                    <DatePicker
                      format="YYYY-MM-DD"
                      disabled={formItem.disabled}
                    />
                  ) :
                  formItem.type === 'datetime' ? (
                    <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      disabled={formItem.disabled}
                      showTime
                    />
                  ) :
                  formItem.type === 'time' ? (
                    <TimePicker
                      format="HH:mm:ss"
                      disabled={formItem.disabled}
                    />
                  ) : null
                }
              </Form.Item>
            ))
          }
        </Form>
      </Modal>
    ) : null
  );
}

export default ModalWithForm;
