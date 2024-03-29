import React, { useEffect, useState } from 'react';

import { TData, IFormItem, TDictionary } from 'interfaces';
import { getTableParameters, convertDataItem } from 'utils';
import { useGetMetaDictionary } from 'hooks';
import { useDictionaryContext } from 'context';
import { useMetadataSelector } from 'storages/selectors';
import ModalWithForm from 'components/UI/ModalWithForm';

interface IDataAddModal {
  isOpen: boolean;
  onAddHandler: (data: TData) => void;
  onClose: VoidFunction;
  modalTablename?: string;
  modalInitialValues?: TData;
}

const DataAddModal: React.FC<IDataAddModal> = ({
  isOpen,
  onAddHandler,
  onClose,
  modalTablename,
  modalInitialValues,
}) => {
  const [formItems, setFormItems] = useState<IFormItem[]>([]);
  const [initialValues, setInitialValues] = useState<TData>({});
  const [metadata, setMetadata] = useState<TData[] | null>(null);
  const [dictionary, setDictionary] = useState<TDictionary | null>(null);

  const { metadata: modalTableMetadata, dictionary: modalTableDictionary } = useGetMetaDictionary(modalTablename);
  const { data: contextMetadata } = useMetadataSelector();
  const { dictionary: contextDictionary } = useDictionaryContext();

  useEffect(() => {
    if (modalTableMetadata && modalTableDictionary) {
      setMetadata(modalTableMetadata);
      setDictionary(modalTableDictionary);
    } else if (contextMetadata && contextDictionary) {
      setMetadata(contextMetadata);
      setDictionary(contextDictionary);
    }
  }, [
    modalTableMetadata,
    modalTableDictionary,
    contextMetadata,
    contextDictionary,
  ]);

  useEffect(() => {
    if (formItems && metadata && dictionary) {
      const defaultData: TData = Object.fromEntries(metadata
        .filter(({ id }) => id !== 'specificValue')
        .map((d) => [d.id, d.defaultValue]));
      const initialData = modalInitialValues ? modalInitialValues : defaultData;

      setInitialValues(convertDataItem(dictionary, initialData, metadata, 'modalAdd'));
    }
  }, [metadata, formItems, modalInitialValues, dictionary]);

  useEffect(() => {
    if (metadata) {
      setFormItems(metadata
        .filter((m) => m.id !== 'specificParameters')
        .sort((a, b) => a.tableIndex - b.tableIndex)
        .map((m) => ({
          label: m.title,
          name: m.id,
          type: m.type,
          rules: m.addMenuIndex ? [{ required: true, message: 'Поле должно быть корректно заполнено!' }] : [],
          disabled: m.id === 'id',
        })));
    }
  }, [ metadata ]);

  return (
    metadata ? (
      <ModalWithForm
        title={getTableParameters(metadata).addMenuTitle || 'Добавить'}
        okButtonTitle='Добавить'
        isOpen={isOpen}
        handleOk={onAddHandler}
        handleClose={onClose}
        formItems={formItems}
        initialValues={initialValues}
        additionalButtons={[]}
        modalDictionary={dictionary}
      />
    ) : null
  );
};

export default DataAddModal;
