import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, DatePicker, TimePicker, Select, Checkbox } from 'antd';
import { useDictionaryContext } from '../../../context/DictionaryContext';
import { IFormItem } from '../../../types/IFormItem';
import { IModalWithForm } from '../../../types/IModalWithForm';
import { convertDataItem } from '../../../utils/convertDataItem';
import { TDictionary } from "../../../types/TDictionary";

const ModalWithForm: React.FC<IModalWithForm> = ({
  title,
  okButtonTitle = 'Сохранить',
  isOpen,
  handleOk,
  handleClose,
  formItems,
  additionalButtons,
  initialValues,
  modalDictionary
}) => {
  const [form] = Form.useForm();

  const { dictionary: contextDictionary } = useDictionaryContext();
  const [dictionary, setDictionary] = useState<TDictionary | null>(null);

  useEffect(() => {
    setDictionary(modalDictionary || contextDictionary);
  }, [contextDictionary, modalDictionary])

  const onOk =
    (callback: (values: any) => void) =>
    () => {
      form
        .validateFields()
        .then((values) => {
          if (dictionary) {
            values = convertDataItem(dictionary, values, formItems, 'form');

            callback(values);
          }
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
                valuePropName={formItem.type === "checkbox" ? "checked" : "value"}
              >
                {
                  (['string', 'number'].includes(formItem.type)) ?
                    <Input disabled={formItem.disabled} /> :
                  formItem.type === 'fulltext' ?
                    <Input.TextArea disabled={formItem.disabled} /> :
                  formItem.type === 'checkbox' ?
                    <Checkbox disabled={formItem.disabled} /> :
                  (['select', 'multi-select'].includes(formItem.type)) ? (
                    <Select
                      disabled={formItem.disabled}
                      allowClear
                      filterOption={(value: string, option) => RegExp(value, 'i').test(`${option?.label}`)}
                      mode={formItem.type === 'multi-select' ? 'multiple' : undefined}
                      showSearch
                      options={
                        dictionary
                          ? Object.entries(dictionary[formItem.name])
                              .map(([value, info]) => (
                                { value, label: info.text }
                              ))
                          : []
                      }
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
