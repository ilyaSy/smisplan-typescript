// import { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, TimePicker, Select } from 'antd';
import useDictionaryContext from '../../../context/DictionaryContext';
import { IFormItem } from '../../../types/IFormItem';
import { IModalWithForm } from '../../../types/IModalWithForm';
import moment from 'moment';
import { useEffect } from 'react';

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
    console.log('Form submit');

    form
      .validateFields()
      .then((values) => {
        console.log(values);
        console.log(handleOk.toString())

        handleOk(values);
      })
      .catch(console.log)
  };

  useEffect(() => {
    if (formItems && initialValues) {
      formItems.forEach((formItem) => {
        switch (formItem.type) {
          case 'date':
          case 'datetime':
            initialValues[formItem.name] = moment(new Date(initialValues[formItem.name]))
            break;
          
          case 'time':
            initialValues[formItem.name] = moment(new Date('1970-01-01 '+ initialValues[formItem.name]))
            break;

          case 'multi-select':
            initialValues[formItem.name] = initialValues[formItem.name].split(/, ?/)
            break;

          default:
            break;
        }
      })
    }
  }, [formItems, initialValues]);

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
                {/* <Input
                  disabled={formItem.disabled}
                /> */}
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
                      // filterSort={}
                      mode={formItem.type === 'multi-select' ? 'multiple' : undefined}
                      showSearch
                      options={Object.entries(dictionary[formItem.name]).map(([text, value]) => (
                        { value, text }
                      ))}
                    />
                  ) : 
                  formItem.type === 'date' ? (
                    <DatePicker
                      disabled={formItem.disabled}
                      format="YYYY-MM-DD"
                    />
                  ) :
                  formItem.type === 'datetime' ? (
                    <DatePicker
                      disabled={formItem.disabled}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  ) : 
                  formItem.type === 'time' ? (
                    <TimePicker
                      disabled={formItem.disabled}
                      format="HH:mm:ss"
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