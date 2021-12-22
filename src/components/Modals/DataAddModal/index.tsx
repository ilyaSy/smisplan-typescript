import { useEffect, useState } from 'react';
import useMetadataSelector from '../../../storages/selectors/metadata';
import ModalWithForm from '../../UI/ModalWithForm/ModalWithForm';
import getTableParameters from '../../../utils/getTableParameters';
import { IFormItem } from '../../../types/IFormItem';
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
            rules: m.addMenuIndex ? [{ required: true, message: 'Поле должно быть корректно заполнено!' }] : [],
            disabled: m.id === 'id',
          }
      }));
    }
  }, [ metadata ]);

  return (
    metadata && !isError && !isLoading ? (
      <ModalWithForm
        title={getTableParameters(metadata).addMenuTitle || 'Добавить'}
        isOpen={isOpen}
        handleOk={onAddHandler}
        handleClose={onClose}
        formItems={formItems}
        additionalButtons={[]}
      />
    ) : null
  );
};

export default DataAddModal;
