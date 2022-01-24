import ReactToPrint from 'react-to-print';
import { Tooltip } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

export const PrintPDF: React.FC = () => {
  return (
    <ReactToPrint
      trigger={() => (
        <Tooltip
          placement='bottomLeft'
          title='Печать в PDF'
          className='tooltip'
        >
          <PrinterOutlined style={{ fontSize: '30px' }} />
        </Tooltip>
      )}
      // content={() => dataRef.current}
      content={() => null}
    />
  )
}
