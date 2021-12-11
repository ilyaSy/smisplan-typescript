import { ConfigProvider, Table } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import TableEditableRow from '../TableEditableRow';
import TableEditableCell from '../TableEditableCell';
import TableExpandableRow from '../TableExpandableRow';
import TableFilterIcon from '../TableFilterIcon';
import filterData from '../../../utils/filterData';
import sortData from '../../../utils/sortData';
import DropdownMenu from '../DropdownMenu';
import { TData } from '../../../types/TData';
import classes from './Table.module.scss';

type TTableProps = {
  data: TData[],
  columns: TData[]
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    isInlineEditable: true,
    sorter: sortData('name'),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: sortData('age'),
    filters: [
      {
        text: '12',
        value: '12',
      },
      {
        text: '22',
        value: '22',
      },
    ],
    onFilter: filterData('age'),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: filterData('address'),
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];

// const data: any[] = [];
// for (let i = 1; i <= 1000; i++) {
//   const dataItem = {
//     key: i,
//     name: `John Brown ${i}`,
//     age: parseInt(`${i}2`),
//     address: `New York No. ${i} Lake Park`,
//     description: i < 5 ? `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.` : null,
//   };
  
//   data.push({
//     ...dataItem,
//     action: <DropdownMenu key={`action-menu-${dataItem.key}`} dataItem={dataItem} title='Меню действий'/>
//   });
// }

const DataTable: React.FC<TTableProps> = ({ data, columns }) => {
  const sourceData = data.map((dataItem) => {
    return {
      ...dataItem,
      action: <DropdownMenu key={`action-menu-${dataItem.key}`} dataItem={dataItem} title='Меню действий'/>
    }
  })

  const handleSave = (row: any) => {
    console.log(row);
  }
  
  const tableColumns = columns.map(column => {
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
  });

  return (
    <ConfigProvider locale={ruRU}>
      <Table
        dataSource={ sourceData }       // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        columns={ tableColumns }  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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