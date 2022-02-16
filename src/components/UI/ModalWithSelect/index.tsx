import { useCallback, useMemo, useState } from 'react';
import { Modal, Radio, RadioChangeEvent, Space } from 'antd';
import { TPrintMode } from '../../../context/PrintPDFContext';

type TUseModalWithSelect = (
  title: string,
  list: {
    optionTitle: string,
    optionValue: string,
  }[],
  onSubmit: (value: TPrintMode) => void,
) => {
  toggleOpen: (mode: boolean) => void,
  ModalPrintSelect: JSX.Element,
  value: string | number | boolean | undefined
};

export const useModalWithSelect: TUseModalWithSelect = (title, list, onSubmit) => {
  const [value, setValue] = useState<TPrintMode>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback((mode: boolean) => setIsOpen(mode), [])

  const handleChange = (e: RadioChangeEvent) => setValue(e.target.value);
  const handleSubmit = useCallback(() => onSubmit(value), [onSubmit, value]);
  const handleClose = useCallback(() => handleToggle(false), [handleToggle]);

  const ModalPrintSelect = useMemo(() => (
    <Modal
      title={title}
      onOk={handleSubmit}
      onCancel={handleClose}
      visible={isOpen}
      okButtonProps={{ disabled: !value }}
    >
      <Radio.Group onChange={handleChange} value={value}>
        <Space direction="vertical">
          {
            list.map(({optionTitle, optionValue}) => (
              <Radio key={optionValue} value={optionValue}>{optionTitle}</Radio>
            ))
          }
        </Space>
      </Radio.Group>
    </Modal>
  ), [title, list, value, isOpen, handleClose, handleSubmit]);

  return {
    toggleOpen: handleToggle,
    ModalPrintSelect,
    value
  };
}
