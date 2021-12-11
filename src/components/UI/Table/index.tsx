import { ConfigProvider, Table } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import TableEditableRow from '../TableEditableRow';
import TableEditableCell from '../TableEditableCell';
import TableExpandableRow from '../TableExpandableRow';
import TableFilterIcon from '../TableFilterIcon';
import DropdownMenu from '../DropdownMenu';
import { TData } from '../../../types/TData';
import classes from './Table.module.scss';

type TTableProps = {
  data: TData[],
  columns: TData[]
};

const DataTable: React.FC<TTableProps> = ({ data, columns }) => {
  const sourceData = data.map((dataItem) => {
    return {
      ...dataItem,
      action: <DropdownMenu key={`action-menu-${dataItem.key}`} dataItem={dataItem} title='Меню действий'/>
    }
  })
  
  const tableColumns = columns    
  .map(column => {
    return !column.isInlineEditable
    ? {
      ...column, 
          filterIcon: TableFilterIcon,
        }
        : {
          ...column,
          filterIcon: TableFilterIcon,
          onCell: (record: any) => ({
            record,
          editable: column.isInlineEditable,
          dataIndex: column.dataIndex,
          title: column.title,
          handleSave: handleSave,
        }),
      };
    })

  const handleSave = (row: any) => {
    console.log(row);
  }
    
  console.log(sourceData);
  console.log(tableColumns);
  
  return (
    <ConfigProvider locale={ruRU}>
      <Table
        dataSource={ sourceData }
        columns={ tableColumns }
        components={{
          body: {
            row: TableEditableRow,
            cell: TableEditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered={ false }
        loading={ false }
        size='large'
        expandable={ TableExpandableRow('description') }
        // expandIcon
        sticky={ true }
        pagination={{ position: ["topRight"] }}
        className={ classes.table }
      />
    </ConfigProvider>
  );
}

export default DataTable;