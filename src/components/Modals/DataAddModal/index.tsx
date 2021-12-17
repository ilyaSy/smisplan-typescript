import { Form } from 'antd';
import { useEffect, useState } from 'react';
import useMetadataSelector from '../../../storages/selectors/metadata';
import { IFormItem } from '../../../types/IFormItem';
import { TData } from '../../../types/TData';
import ModalWithForm from '../../UI/ModalWithForm/ModalWithForm';

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
  const [formItems, setFormItems] = useState<IFormItem[]>([]);

  const { data: metadata, isError, isLoading } = useMetadataSelector();
  
  useEffect(() => {
    if (metadata) {
      setFormItems(metadata
        .sort((a, b) => a.tableIndex - b.tableIndex)
        .map((m) => {
          // console.log(m)
          return {
            label: m.title,
            name: m.id,
            type: m.type,
            rules: m.addMenuIndex ? [{ required: true, message: 'Поле должно быть корректно заполнено!' }] : []
          }
      }));
    }
  }, [ metadata ]);

  useEffect(() => {
    if (formItems) {
      console.log(formItems);
    }
  }, [formItems]);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onAddHandler(values);
      })
      .catch(console.dir);
  };

  return (
    metadata && !isError && isLoading ? (
      <ModalWithForm
        title='Добавить'
        isOpen={isOpen}
        onOk={onOk}
        onClose={onClose}
        form={form}
        formItems={formItems}
        // formItems={[
        //   {
        //     label: "Имя",
        //     name: "username",
        //     type: "string",
        //     rules: [{ required: true, message: 'Поле должно быть корректно заполнено!' }]
        //   } as IFormItem,
        //   {
        //     label: "Фамилия",
        //     name: "surname",
        //     type: "string",
        //     rules: [{ required: true, message: 'Поле должно быть корректно заполнено!' }]
        //   } as IFormItem,
        // ]}
      />
    ) : null
  );
};

export default DataAddModal;
