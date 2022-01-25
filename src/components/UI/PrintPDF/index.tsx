import { useReactToPrint } from 'react-to-print';
import { Tooltip } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { TPrintMode, usePrintPDFContext } from '../../../context/PrintPDFContext';
import { useCallback, useMemo } from 'react';
import { useModalWithSelect } from '../ModalWithSelect';

export const PrintPDF: React.FC = () => {
  const { dataPrintRef, setDataPrintMode } = usePrintPDFContext();

  const handleOpen = () => toggleOpen(true);

  const print = useReactToPrint({
    content: () => dataPrintRef ? dataPrintRef.current : null,
    onAfterPrint: () => {
      setDataPrintMode(undefined)
      toggleOpen(false);
    },
  });

  const handlePrint = useCallback((mode: TPrintMode) => {
    setDataPrintMode(mode);
    print();
  }, [print, setDataPrintMode]);

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
  const [toggleOpen, ModalPrintSelect] = useModalWithSelect(modalTitle, listOptions, handlePrint);

  return (
    <Tooltip
      placement='bottomLeft'
      title='Печать в PDF'
      className='tooltip'
    >
      <PrinterOutlined onClick={handleOpen} style={{ fontSize: '30px' }}/>
      {ModalPrintSelect}
    </Tooltip>
  )
}
