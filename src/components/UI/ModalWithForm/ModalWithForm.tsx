import { Modal, Form, Input, Checkbox } from 'antd';
import { IFormItem } from '../../../types/IFormItem';
import { IModalWithForm } from '../../../types/IModalWithForm';

const ModalWithForm: React.FC<IModalWithForm> = ({title, isOpen, onOk, onClose, form, formItems}) => {  
  return (
    <Modal title={title} visible={isOpen} onOk={onOk} onCancel={onClose}>
      <Form
        name='basic'
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
              {
                ['string', 'number'].includes(formItem.type) && (
                  <Input />
                )
              }
              {
                formItem.type === 'string' && (
                  <Input />
                )
              }
            </Form.Item>
          ))
        }
        {/* <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Поле должно быть корректно заполнено!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Поле должно быть корректно заполнено!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
      </Form>
    </Modal>
  );
}

export default ModalWithForm;