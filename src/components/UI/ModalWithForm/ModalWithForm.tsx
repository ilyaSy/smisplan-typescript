import { Modal, Form, Input, Button, DatePicker, TimePicker, Select } from 'antd';
import useDictionaryContext from '../../../context/DictionaryContext';
import { IFormItem } from '../../../types/IFormItem';
import { IModalWithForm } from '../../../types/IModalWithForm';
import moment from 'moment';
import React from "react";

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

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        formItems.forEach((formItem) => {
          switch (formItem.type) {
            case 'date':
              values[formItem.name] = moment(values[formItem.name]).format('YYYY-MM-DD');
              break;

            case 'time':
              values[formItem.name] = moment(values[formItem.name]).format('HH:mm:ss');
              break;

            case 'datetime':
              values[formItem.name] = moment(values[formItem.name]).format('YYYY-MM-DD HH:mm:ss');
              break;

            case 'multi-select':
              values[formItem.name] = values[formItem.name].join(',');
              break;

            default:
              break;
          }
        })

        handleOk(values);
      })
      .catch(console.log)
  };

  return (
    isOpen ? (
      <Modal
        title={title}
        visible={isOpen}
        onOk={onOk}
        onCancel={handleClose}
        footer={[
          <Button type="primary" danger onClick={handleClose}>Отмена</Button>,
          ...additionalButtons,
          <Button type="primary" onClick={onOk}>{okButtonTitle}</Button>,
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
