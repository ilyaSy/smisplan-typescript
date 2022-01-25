import { useCallback, useState } from 'react';
import { Modal, Radio, RadioChangeEvent, Space } from 'antd';
import { TPrintMode } from '../../../context/PrintPDFContext';

type TUseModalWithSelect = (
  title: string,
  list: {
    optionTitle: string,
    optionValue: string,
  }[],
  onSubmit: (value: TPrintMode) => void,
) => [
  (mode: boolean) => void,
  JSX.Element
];

export const useModalWithSelect: TUseModalWithSelect = (title, list, onSubmit) => {
  const [value, setValue] = useState<TPrintMode>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback((mode: boolean) => setIsOpen(mode), [])

  const handleChange = (e: RadioChangeEvent) => {console.log(e); setValue(e.target.value)};
  const handleSubmit = () => onSubmit(value);
  const handleClose = () => handleToggle(false);

  return [
    handleToggle,
    <Modal
      title={title}
      onOk={handleSubmit}
      onCancel={handleClose}
      visible={isOpen}
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
  ];
}
