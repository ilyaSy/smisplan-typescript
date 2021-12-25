// import { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { IFormItem } from '../../../types/IFormItem';
import { IModalWithForm } from '../../../types/IModalWithForm';

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

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleOk(values);
      })
      .catch(console.dir)
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
          // initialValues={{ remember: true }}
          initialValues={initialValues ? initialValues : {}}
          onFinish={console.log}
          onFinishFailed={console.log}
          form={form}
        >
          {
            formItems.map((formItem: IFormItem) => (
              <Form.Item
                label={formItem.label}
                name={formItem.name}
                rules={formItem.rules}
              >
                <Input
                  disabled={formItem.disabled}
                />
              </Form.Item>
            ))
          }
        </Form>
      </Modal>
    ) : null
  );
}

export default ModalWithForm;