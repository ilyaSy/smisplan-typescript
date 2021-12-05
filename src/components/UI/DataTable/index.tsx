import { ConfigProvider, Table, Space } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import DataTableEditableRow from '../DataTableEditableRow';
import DataTableEditableCell from '../DataTableEditableCell';
import dataTableExpandableRow from '../dataTableExpandableRow';
import filterData from '../../../utils/filterData';
import sortData from '../../../utils/sortData';
import classes from './DataTable.module.scss';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    editable: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
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
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: any[] = [];
for (let i = 0; i <= 1000; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: i < 5 ? `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.` : null,
  });
}

const DataTable: React.FC = () => {
  const handleSave = (row: any) => {
    console.log(row);
  }
  
  const tableColumns = columns.map(column => {
    if (!column.editable) return column;
    
    return {
      ...column,
      onCell: (record: any) => ({
        record,
        editable: column.editable,
        dataIndex: column.dataIndex,
        title: column.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <ConfigProvider locale={ruRU}>
      <Table
        dataSource={ data }       // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        columns={ tableColumns }  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        components={{
          body: {
            row: DataTableEditableRow,
            cell: DataTableEditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered={ false }
        loading={ false }
        size='large'
        expandable={ dataTableExpandableRow('description') }
        sticky={ true }
        pagination={{ position: ["topRight"] }}
        className={ classes.table }
      />
    </ConfigProvider>
  );
}

export default DataTable;