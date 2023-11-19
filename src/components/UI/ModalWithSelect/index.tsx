import { useMemo, useState } from 'react';
import { Modal, Radio, RadioChangeEvent, Space } from 'antd';

import { TPrintMode } from 'context';

type TUseModalWithSelect = (
  title: string,
  list: {
    optionTitle: string,
    optionValue: string,
  }[],
  onSubmit: (value: TPrintMode) => void,
) => {
  toggleOpen: VoidFunction,
  ModalPrintSelect: JSX.Element,
  value: string | number | boolean | undefined
};

export const useModalWithSelect: TUseModalWithSelect = (title, list, onSubmit) => {
  const [value, setValue] = useState<TPrintMode>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (e: RadioChangeEvent) => setValue(e.target.value);

  const ModalPrintSelect = useMemo(() => (
    <Modal
      title={title}
      onOk={() => onSubmit(value)}
      onCancel={() => setIsOpen(false)}
      visible={isOpen}
      okButtonProps={{ disabled: !value }}
    >
      <Radio.Group onChange={handleChange} value={value}>
        <Space direction="vertical">
          {
            list.map(({ optionTitle, optionValue }) => (
              <Radio key={optionValue} value={optionValue}>{optionTitle}</Radio>
            ))
          }
        </Space>
      </Radio.Group>
    </Modal>
  ), [title, isOpen, value, list, onSubmit]);

  return {
    toggleOpen: () => setIsOpen(true),
    ModalPrintSelect,
    value,
  };
};
