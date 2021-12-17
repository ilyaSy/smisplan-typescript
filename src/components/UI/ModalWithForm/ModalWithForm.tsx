import { Modal, Form, Input, Checkbox } from 'antd';
// import { useEffect } from 'react';
import { IFormItem } from '../../../types/IFormItem';
import { IModalWithForm } from '../../../types/IModalWithForm';

const ModalWithForm: React.FC<IModalWithForm> = ({title, isOpen, handleOk, handleClose, formItems}) => {  
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

      >
        <Form
          name='basic'
          preserve={false}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
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
                  disabled={formItem.name === 'id'}
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