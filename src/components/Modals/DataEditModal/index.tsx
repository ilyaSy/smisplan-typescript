import { useEffect, useState } from 'react';
import { Button } from 'antd';
import useMetadataSelector from '../../../storages/selectors/metadata';
import getTableParameters from '../../../utils/getTableParameters';
import ModalWithForm from '../../UI/ModalWithForm/ModalWithForm';
import { IFormItem } from '../../../types/IFormItem';
import { TData } from '../../../types/TData';

interface IDataEditModal {
  isOpen: boolean;
  onEditHandler: (data: TData) => void;
  onClose: () => void;
  formData: TData;
}

const DataEditModal: React.FC<IDataEditModal> = ({
  isOpen,
  onEditHandler,
  onClose,
  formData
}) => {
  const [formItems, setFormItems] = useState<IFormItem[]>([]);

  const { data: metadata, isError, isLoading } = useMetadataSelector();
  
  useEffect(() => {
    if (metadata) {
      setFormItems(metadata
        .filter((m) => m.id !== 'specificParameters')
        .sort((a, b) => a.tableIndex - b.tableIndex)
        .map((m) => {
          return {
            label: m.title,
            name: m.id,
            type: m.type,
            // rules: m.addMenuIndex ? [{ required: true, message: 'Поле должно быть корректно заполнено!' }] : [],
            rules: [],
            disabled: !m.isEditable,
          }
      }));
    }
  }, [ metadata ]);

  return (
    metadata && !isError && !isLoading ? (
      <ModalWithForm
        title={getTableParameters(metadata).addMenuTitle || 'Добавить'}
        okButtonTitle='Сохранить'
        isOpen={isOpen}
        handleOk={onEditHandler}
        handleClose={onClose}
        formItems={formItems}
        initialValues={formData}
        additionalButtons={[
          <Button onClick={onEditHandler}>Сохранить как новый</Button>
        ]}
      />
    ) : null
  );
};

export default DataEditModal;
