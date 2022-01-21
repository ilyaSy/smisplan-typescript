import { ConfigProvider, Table } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import TableEditableRow from '../TableEditableRow';
import DataTableEditableCell from '../../TableEditableCell';
import TableExpandableRow from '../TableExpandableRow';
import TableFilterIcon from '../TableFilterIcon';
import ActionMenu from '../../ActionMenu';
import { TData } from '../../../types/TData';
import { TTableParameters } from '../../../types/TTableParameters';
import { useFilterDrawer } from '../FilterDrawer';
import classes from './Table.module.scss';

type TTableProps = {
  data: TData[],
  columns: TData[],
  tableParameters: TTableParameters
};

const DataTable: React.FC<TTableProps> = ({ data, columns, tableParameters }) => {
  const sourceData = data.map((dataItem, index) => ({
    ...dataItem,
    key: `table-row-${dataItem.id}-${index}`,
    action: <ActionMenu
      key={`action-menu-${dataItem.id}-${index}`}
      title='Меню действий'
      dataItem={dataItem}
      tableParameters={tableParameters}
    />
  }))

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
            }),
          };
      }
    )

  const {
    FilterButtons,
    Filter,
    filterData
  } = useFilterDrawer(tableColumns, sourceData);

  return (
    <ConfigProvider locale={ruRU}>
      {Filter}

      <Table
        dataSource={ filterData }
        columns={ tableColumns }
        title={ FilterButtons }
        components={{
          body: {
            row: TableEditableRow,
            cell: DataTableEditableCell,
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
