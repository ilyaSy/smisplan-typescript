import { useCallback, useEffect, useMemo } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Tooltip } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { TPrintMode, usePrintPDFContext } from '../../../context/PrintPDFContext';
import { useModalWithSelect } from '../ModalWithSelect';

export const PrintPDF: React.FC = () => {
  const { dataPrintRef, setDataPrintMode, dataPrintMode } = usePrintPDFContext();

  const handleOpen = () => toggleOpen(true);

  const print = useReactToPrint({
    content: () => (
      dataPrintRef
        ? document.getElementsByClassName('ant-table-container')[0]
        : null
    ),
    onAfterPrint: () => {
      setDataPrintMode(undefined)
      toggleOpen(false);
    },
  });

  useEffect(() => {
    if (['print', 'current'].includes(dataPrintMode as string)) print();
  }, [print, dataPrintMode]);

  const handlePrint = useCallback((mode: TPrintMode) => {
    setDataPrintMode(mode);
  }, [setDataPrintMode]);

  const listOptions = useMemo(() => [
    {
      optionTitle: 'Текущая страница',
      optionValue: 'current',
    },
    {
      optionTitle: 'Все страницы',
      optionValue: 'all',
    }
  ], []);

  const modalTitle = 'Распечатать все страницы или текущую?';
  const {toggleOpen, ModalPrintSelect} = useModalWithSelect(modalTitle, listOptions, handlePrint);

  return (
    <Tooltip
      placement='bottomLeft'
      title='Печать в PDF'
      className='tooltip'
    >
      {ModalPrintSelect}

      <PrinterOutlined onClick={handleOpen} style={{ fontSize: '30px' }}/>
    </Tooltip>
  )
}
