import { Modal, Form, Input, Checkbox } from 'antd';
import { TData } from '../../../types/TData';

interface IDataAddModal {
  isOpen: boolean;
  onAddHandler: (data: TData) => void;
  onClose: () => void;
}

const DataAddModal: React.FC<IDataAddModal> = ({
  isOpen,
  onAddHandler,
  onClose,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onAddHandler(values);
      })
      .catch(console.dir);
  };

  return (
    <Modal title='Добавить' visible={isOpen} onOk={handleOk} onCancel={onClose}>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={console.log}
        onFinishFailed={console.log}
        form={form}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DataAddModal;
