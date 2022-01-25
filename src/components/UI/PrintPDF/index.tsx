import ReactToPrint from 'react-to-print';
import { Tooltip } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { usePrintPDFContext } from '../../../context/PrintPDFContext';

export const PrintPDF: React.FC = () => {
  const { dataPrintRef } = usePrintPDFContext();

  // const handleStartPrint = () => printPDF(true);
  // const handleStopPrint = () => printPDF(false);

  return (
    <ReactToPrint
      trigger={() => (
        <Tooltip
          placement='bottomLeft'
          title='Печать в PDF'
          className='tooltip'
        >
          <PrinterOutlined style={{ fontSize: '30px' }}/>
        </Tooltip>
      )}
      content={() => dataPrintRef ? dataPrintRef.current : null}
      // onBeforePrint={handleStartPrint}
      // onAfterPrint={handleStopPrint}
    />
  )
}
