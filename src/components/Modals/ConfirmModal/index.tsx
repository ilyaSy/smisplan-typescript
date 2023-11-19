import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type TConfirmModal = ({
  onOk: VoidFunction,
  onCancel: VoidFunction,
  onFinally?: VoidFunction,
  description?: string,
  okText?: string,
});

const { confirm  } = Modal;

const showConfirmModal = ({ onOk, onCancel, onFinally, description, okText }: TConfirmModal) => {
  const handleOk = () => {
    onOk();

    if (onFinally !== undefined) onFinally();
  };

  const handleCancel = () => {
    onCancel();

    if (onFinally !== undefined) onFinally();
  };

  confirm({
    title: 'Вы подтверждаете действие ?',
    icon: <ExclamationCircleOutlined />,
    content: description,
    okText: okText || 'Удалить',
    okType: 'danger',
    cancelText: 'Отмена',
    onOk: handleOk,
    onCancel: handleCancel,
  });
};

export default showConfirmModal;
