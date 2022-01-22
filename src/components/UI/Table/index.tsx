import { ConfigProvider, Pagination, Table } from 'antd';
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
import { useCallback, useEffect, useMemo, useState } from 'react';

type TTableProps = {
  data: TData[],
  columns: TData[],
  tableParameters: TTableParameters
};

const PAGE_SIZE = 10;

const DataTable: React.FC<TTableProps> = ({ data, columns, tableParameters }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [tableData, setTableData] = useState<TData[]>([]);

  const sourceData = useMemo(() => {
    return data.map((dataItem, index) => ({
      ...dataItem,
      key: `table-row-${dataItem.id}-${index}`,
      action: <ActionMenu
        key={`action-menu-${dataItem.id}-${index}`}
        title='Меню действий'
        dataItem={dataItem}
        tableParameters={tableParameters}
      />
    }))
  }, [data, tableParameters])

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

  const handleChangePage = useCallback((nextPage: number, pageSize: number) => {
    setPage(nextPage);
    setPageSize(pageSize);
    setTableData([...filterData || []].splice((nextPage - 1)*pageSize, pageSize));
  }, [filterData])

  const TableTitle = useCallback(() => (
    <div className={classes['table-title']}>
      {FilterButtons}

      <Pagination
        showSizeChanger
        current={page}
        pageSize={pageSize}
        onChange={handleChangePage}
        total={(filterData || []).length}
      />
    </div>
  ), [FilterButtons, filterData, page, pageSize, handleChangePage]);

  useEffect(() => {
    setTableData([...filterData || []].splice(0, pageSize));
  }, [filterData, pageSize])

  return (
    <ConfigProvider locale={ruRU}>
      {Filter}

      <Table
        dataSource={ tableData }
        columns={ tableColumns }
        title={TableTitle}
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
        // pagination={{ position: ["topRight"] }}
        pagination={false}
        className={ classes.table }
      />
    </ConfigProvider>
  );
}

export default DataTable;
