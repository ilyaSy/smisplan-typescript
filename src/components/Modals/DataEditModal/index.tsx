import React, { useEffect, useState } from 'react';
import useMetadataSelector from '../../../storages/selectors/metadata';
import getTableParameters from '../../../utils/getTableParameters';
import ModalWithForm from '../../UI/ModalWithForm';
import { IFormItem } from '../../../types/IFormItem';
import { TData } from '../../../types/TData';
import { TButton } from '../../../types/TButton';
import moment from 'moment';
import { invert } from 'lodash';
import useDictionaryContext from '../../../context/DictionaryContext';

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

  const [formItems, setFormItems] = useState<IFormItem[]>([]);
  const [initialValues, setInitialValues] = useState<TData>(formData);

  useEffect(() => {
    if (formItems && formData) {
      setInitialValues(
        Object.fromEntries(formItems.map((formItem) => {
          const inverseDictionary = invert(dictionary[formItem.name]);
          if (formData[formItem.name]) {
            switch (formItem.type) {
              case 'date':
              case 'datetime':
                return [formItem.name, moment(new Date(formData[formItem.name]))]

              case 'time':
                return [formItem.name, moment(new Date('1970-01-01 '+ formData[formItem.name]))]

              case 'select':
                return [formItem.name, inverseDictionary[formData[formItem.name]]]

              case 'multi-select':
                return [
                  formItem.name,
                  formData[formItem.name].split(/, ?/).map((v: string) => inverseDictionary[v])
                ]

              default:
                return [formItem.name, formData[formItem.name]]
            }
          }
          return [formItem.name, formData[formItem.name]];
        }))
      )
    }
  }, [formData, formItems, dictionary]);

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
