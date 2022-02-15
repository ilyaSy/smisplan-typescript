import React, { useEffect, useState } from 'react';
import { useMetadataSelector } from '../../../storages/selectors/metadata';
import { getTableParameters } from '../../../utils/getTableParameters';
import { convertDataItem } from '../../../utils/convertDataItem';
import { IFormItem } from '../../../types/IFormItem';
import { TData } from '../../../types/TData';
import { TButton } from '../../../types/TButton';
import { useDictionaryContext } from '../../../context/DictionaryContext';
import ModalWithForm from '../../UI/ModalWithForm';

interface IDataEditModal {
  isOpen: boolean;
  onEditHandler: (data: TData) => void;
  onAddHandler?: (data: TData) => void;
  onClose: () => void;
  formData: TData;
}

const DataEditModal: React.FC<IDataEditModal> = ({
  isOpen,
  onEditHandler,
  onAddHandler,
  onClose,
  formData
}) => {
  const { dictionary } = useDictionaryContext();

  const { data: metadata, isError, isLoading } = useMetadataSelector();

  const [formItems, setFormItems] = useState<IFormItem[]>([]);
  const [initialValues, setInitialValues] = useState<TData>(formData);

  useEffect(() => {
    if (formItems && formData && metadata) {
      setInitialValues(convertDataItem(dictionary, formData, metadata, 'modalEdit'));
    }
  }, [formData, formItems, dictionary, metadata]);

  useEffect(() => {
    if (metadata) {
      setFormItems(metadata
        .filter((m) => m.id !== 'specificParameters')
        .filter((m) => !m.isPseudo)
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
        initialValues={initialValues}
        additionalButtons={[
          {
            onClick: onAddHandler,
            title: 'Сохранить как новый'
          } as TButton
        ]}
      />
    ) : null
  );
};

export default DataEditModal;
