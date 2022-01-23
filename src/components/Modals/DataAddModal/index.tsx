import React, { useEffect, useState } from 'react';
import moment from "moment";
import ModalWithForm from '../../UI/ModalWithForm';
import getTableParameters from '../../../utils/getTableParameters';
import { IFormItem } from '../../../types/IFormItem';
import { TData } from '../../../types/TData';
import { TDictionary } from '../../../types/TDictionary';
// import useGetTablename from '../../../utils/hooks/useGetTablename';
import { useGetMetaDictionary } from '../../../utils/hooks/useGetMetaDictionary';
import useMetadataSelector from '../../../storages/selectors/metadata';
import useDictionaryContext from '../../../context/DictionaryContext';

interface IDataAddModal {
  isOpen: boolean;
  onAddHandler: (data: TData) => void;
  onClose: () => void;
  modalTablename?: string;
  modalInitialValues?: TData;
}

const DataAddModal: React.FC<IDataAddModal> = ({
  isOpen,
  onAddHandler,
  onClose,
  modalTablename,
  modalInitialValues
}) => {
  const [formItems, setFormItems] = useState<IFormItem[]>([]);
  const [initialValues, setInitialValues] = useState<TData>({});
  const [metadata, setMetadata] = useState<TData[] | null>(null);
  const [dictionary, setDictionary] = useState<TDictionary | null>(null);

  // const tablename = useGetTablename();

  // const { metadata, dictionary } = useGetMetaDictionary(modalTablename || tablename);
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
    contextDictionary
  ]);

  useEffect(() => {
    if (formItems && metadata) {
      setInitialValues(
        Object.fromEntries(formItems.map((formItem) => {
          const formItemMetadata = metadata.find(({id}) => id === formItem.name);
          const initialValue: string | undefined =
            modalInitialValues && modalInitialValues[formItem.name]
              ? modalInitialValues[formItem.name]
              : formItemMetadata && formItemMetadata.defaultValue
                ? formItemMetadata.defaultValue
                : undefined;

          if (initialValue) {
            switch (formItem.type) {
              case 'date':
              case 'datetime':
              case 'time':
                return [formItem.name, moment(new Date())]

              case 'select':
                return [formItem.name, initialValue]

              case 'multi-select':
                return [
                  formItem.name,
                  initialValue.split(/, ?/)
                ]

              default:
                return [formItem.name, initialValue]
            }
          }
          return [formItem.name, undefined];
        }))
      )
    }
  }, [metadata, formItems, modalInitialValues]);

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
