import { useCallback, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Tooltip } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

import { TPrintMode, usePrintPDFContext } from 'context';
import { useModalWithSelect } from '../ModalWithSelect';

const listOptions = [
  {
    optionTitle: 'Текущая страница',
    optionValue: 'current',
  },
  {
    optionTitle: 'Все страницы',
    optionValue: 'all',
  },
];

export const PrintPDF: React.FC = () => {
  const { dataRef, setPrintMode, printMode } = usePrintPDFContext();

  const handlePrint = useCallback((mode: TPrintMode) => {
    setPrintMode(mode);
  }, [setPrintMode]);

  const modalTitle = 'Распечатать все страницы или текущую?';
  const { toggleOpen, ModalPrintSelect } = useModalWithSelect(modalTitle, listOptions, handlePrint);

  const print = useReactToPrint({
    content: () => dataRef ? document.getElementsByClassName('ant-table-container')[0] : null,
    onAfterPrint: () => {
      setPrintMode(undefined);
      toggleOpen();
    },
  });

  useEffect(() => {
    if (['print', 'current'].includes(printMode as string)) print();
  }, [print, printMode]);

  return (
    <Tooltip
      title='Печать в PDF'
      placement='bottomLeft'
      className='tooltip'
    >
      {ModalPrintSelect}

      <PrinterOutlined onClick={toggleOpen} style={{ fontSize: '30px' }}/>
    </Tooltip>
  );
};
