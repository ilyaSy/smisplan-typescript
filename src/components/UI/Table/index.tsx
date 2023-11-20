/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

import { TData, IPage, TColumn } from 'interfaces';
import { PAGE_SIZE } from 'consts';
import TableEditableRow from '../TableEditableRow';
import DataTableEditableCell from '../TableEditableCell';
import { useColumnsDrawer } from '../ColumnsPanel';
import { useFilterDrawer } from '../FilterPanel';
import { TableExpandableRow } from '../TableExpandableRow';
import { useTableTitle } from './hooks/useTableTitle';
import { useTableColumns } from './hooks/useTableColumns';
import { useTablePrintRef } from './hooks/useTablePrintRef';

import classes from './index.module.scss';
import './index.css';

type TTableProps = {
  data: TData[];
  columns: TColumn<any>[];
  parameters?: IPage['parameters'];
};

const DataTable: React.FC<TTableProps> = ({ data, columns, parameters }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [sort, setSort] = useState<boolean>(true);

  const handleChangePage = useCallback((nextPage: number, size: number) => {
    setPage(nextPage);
    setPageSize(size);
  }, []);

  const { ColumnsPanelButtons, ColumnsPanel, columnsData } = useColumnsDrawer(columns);

  const { FilterPanelButtons, FilterPanel, filterData } = useFilterDrawer(columnsData, data);

  const dataRef = useTablePrintRef({ filterData, pageSize, setPageSize });

  const tableColumns = useTableColumns({
    dataRef,
    columns: columnsData,
    sortConfig: parameters,
    defaultSort: sort,
  });

  const TableTitle = useTableTitle({
    FilterPanelButtons,
    ColumnsPanelButtons,
    filterData,
    page,
    pageSize,
    handleChangePage,
  });

  return (
    <ConfigProvider locale={ruRU}>
      {FilterPanel}

      {ColumnsPanel}

      <Table
        ref={dataRef}
        dataSource={filterData}
        columns={tableColumns}
        title={TableTitle}
        tableLayout='auto'
        components={{
          body: {
            row: TableEditableRow,
            cell: DataTableEditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered={false}
        loading={false}
        size='large'
        expandable={TableExpandableRow('description')}
        // expandIcon
        sticky={ true }
        pagination={{
          position: ['topRight'],
          pageSize: pageSize,
          current: page,
          total: filterData.length,
          className: classes['hidden-pagination'],
        }}
        className={classes.table}
        onChange={() => setSort(false)}
      />
    </ConfigProvider>
  );
};

export default DataTable;
