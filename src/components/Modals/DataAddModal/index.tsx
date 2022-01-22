import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";
import ModalWithForm from '../../UI/ModalWithForm';
// import useMetadataSelector from '../../../storages/selectors/metadata';
import getTableParameters from '../../../utils/getTableParameters';
import { IFormItem } from '../../../types/IFormItem';
import { TData } from '../../../types/TData';
import metadataGetAction from '../../../storages/actions/metadata';
import { defaultHeaders } from '../../../storages/middleware/apiMiddleware';
import useGetTablename from '../../../utils/hooks/useGetTablename';

interface IDataAddModal {
  isOpen: boolean;
  onAddHandler: (data: TData) => void;
  onClose: () => void;
  modalTablename?: string;
}

const DataAddModal: React.FC<IDataAddModal> = ({
  isOpen,
  onAddHandler,
  onClose,
  modalTablename,
}) => {
  const [formItems, setFormItems] = useState<IFormItem[]>([]);
  const [initialValues, setInitialValues] = useState<TData>({});
  const [metadata, setMetadata] = useState<TData[] | null>(null);

  const tablename = useGetTablename();

  useEffect(() => {
    const metadataAction = metadataGetAction(modalTablename || tablename);
    console.log(metadataAction);

    axios.request({
      method: metadataAction.method,
      url: metadataAction.url,
      headers: defaultHeaders as any,
    })
      .then((response: any) => {
        console.log(response.data);
        setMetadata(response.data);
      })
  }, [modalTablename, tablename]);

  // const { data: metadata, isError, isLoading } = useMetadataSelector();

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
    // metadata && !isError && !isLoading ? (
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
      />
    ) : null
  );
};

export default DataAddModal;
