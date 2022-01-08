import React, { useEffect, useState } from 'react';
import useMetadataSelector from '../../../storages/selectors/metadata';
import ModalWithForm from '../../UI/ModalWithForm';
import getTableParameters from '../../../utils/getTableParameters';
import { IFormItem } from '../../../types/IFormItem';
import { TData } from '../../../types/TData';
import moment from "moment";

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
  const [initialValues, setInitialValues] = useState<TData>({});

  const { data: metadata, isError, isLoading } = useMetadataSelector();

  useEffect(() => {
    if (formItems && metadata) {
      setInitialValues(
        Object.fromEntries(formItems.map((formItem) => {
          // const inverseDictionary = invert(dictionary[formItem.name]);
          const formItemMetadata = metadata.find(({id}) => id === formItem.name);

          if (formItemMetadata && formItemMetadata.defaultValue) {
            switch (formItem.type) {
              case 'date':
              case 'datetime':
              case 'time':
                return [formItem.name, moment(new Date())]

              case 'select':
                return [formItem.name, formItemMetadata.defaultValue]

              case 'multi-select':
                return [
                  formItem.name,
                  formItemMetadata.defaultValue.split(/, ?/)
                ]

              default:
                return [formItem.name, formItemMetadata.defaultValue]
            }
          }
          return [formItem.name, undefined];
        }))
      )
    }
  }, [metadata, formItems]);

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
        okButtonTitle='Добавить'
        isOpen={isOpen}
        handleOk={onAddHandler}
        handleClose={onClose}
        formItems={formItems}
        initialValues={initialValues}
        additionalButtons={[]}
      />
    ) : null
  );
};

export default DataAddModal;
