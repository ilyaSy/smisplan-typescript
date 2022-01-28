import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfigProvider, Pagination, Table } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import ruRU from 'antd/lib/locale/ru_RU';
import TableEditableRow from '../TableEditableRow';
import DataTableEditableCell from '../../TableEditableCell';
import TableExpandableRow from '../TableExpandableRow';
import TableFilterIcon from '../TableFilterIcon';
import ActionMenu from '../../ActionMenu';
import { TData } from '../../../types/TData';
import { TTableParameters } from '../../../types/TTableParameters';
import { useFilterDrawer } from '../FormDrawer';
import { usePrintPDFContext } from '../../../context/PrintPDFContext';
import classes from './Table.module.scss';
import './Table.css';

type TTableProps = {
  data: TData[],
  columns: TData[],
  tableParameters: TTableParameters
};

const PAGE_SIZE = 10;

const DataTable: React.FC<TTableProps> = ({ data, columns, tableParameters }) => {
  const { setDataPrintRef, setDataPrintMode, dataPrintMode } = usePrintPDFContext();
  const dataRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);

  const hasActionMenu = tableParameters.hasActionMenu;

  useEffect(() => {
    if (dataRef) setDataPrintRef(dataRef)
  }, [setDataPrintRef]);

  const sourceData = useMemo(() => {
    return data.map((dataItem, index) => ({
      ...dataItem,
      key: `table-row-${dataItem.id}-${index}`,
      action: hasActionMenu
      ? <ActionMenu
          key={`action-menu-${dataItem.id}-${index}`}
          title='Меню действий'
          dataItem={dataItem}
          tableParameters={tableParameters}
        />
      : null
    }))
  }, [data, tableParameters, hasActionMenu])

  const tableColumns = columns
    .filter((c) => (hasActionMenu && c.dataIndex === 'action') || c.dataIndex !== 'action')
    .map((column) => {
      console.log(tableParameters.defaultSortField);

      return !column.isInlineEditable
        ? {
            ...column,
            defaultSortOrder: (column.dataIndex === tableParameters.defaultSortField
              ? 'descend'
              : undefined) as SortOrder,
            filterIcon: TableFilterIcon,
          }
          : {
            ...column,
            defaultSortOrder: (column.dataIndex === tableParameters.defaultSortField
              ? 'descend'
              : undefined) as SortOrder,
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
    FilterPanel,
    filterData
  } = useFilterDrawer(tableColumns, sourceData);

  const handleChangePage = useCallback((nextPage: number, pageSize: number) => {
    setPage(nextPage);
    setPageSize(pageSize);
  }, [])

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
  ), [
    FilterButtons,
    filterData,
    page,
    pageSize,
    handleChangePage
  ]);

  useEffect(() => {
    if (dataPrintMode === 'all') {
      setPageSize(0);
      setDataPrintMode('print');
    } else if (dataPrintMode === 'current') {
    } else {
      setPageSize(PAGE_SIZE);
    }
  }, [filterData, pageSize, dataPrintMode, setDataPrintMode])

  return (
    <ConfigProvider locale={ruRU}>
      {FilterPanel}

      <Table
        ref={dataRef}
        dataSource={ filterData }
        columns={ tableColumns }
        title={TableTitle}
        // scroll={{x: 'max-content'}}
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
        pagination={{
          position: ['topRight'],
          pageSize: pageSize,
          current: page,
          total: filterData.length,
          className: classes['hidden-pagination']
        }}
        className={ classes.table }
      />
    </ConfigProvider>
  );
}

export default DataTable;
