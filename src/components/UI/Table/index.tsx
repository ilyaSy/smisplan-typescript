import React, { useCallback, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { PAGE_SIZE } from '../../../constants/constants';
import { TData } from '../../../types/TData';
import { TDictionary } from '../../../types/TDictionary';
import { TTableParameters } from '../../../types/TTableParameters';
import { TObject } from '../../../types/TObject';
import TableEditableRow from '../TableEditableRow';
import DataTableEditableCell from '../../TableEditableCell';
import TableExpandableRow from '../TableExpandableRow';
import { useFilterDrawer } from '../FilterPanel';
import { useColumnsDrawer } from '../ColumnsPanel';
import { getTableWithPseudoFields } from './utils/getTableWithPseudoFields';
import { useTableTitle } from './hooks/useTableTitle';
import { useTableColumns } from './hooks/useTableColumns';
import { useTableSourceData } from './hooks/useTableSourceData';
import { useTablePrintRef } from './hooks/useTablePrintRef';
import classes from './Table.module.scss';
import './Table.css';

type TTableProps = {
  data: TData[],
  columns: TData[],
  tableParameters: TTableParameters,
  tablename: string,
  dictionary: TDictionary
  invertDictionary: TObject<Record<string, string>>
};

const DataTable: React.FC<TTableProps> = ({
  data,
  columns,
  tableParameters,
  tablename,
  dictionary,
  invertDictionary
}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [defaultSort, setDefaultSort] = useState<boolean>(true);

  const handleChangePage = useCallback((nextPage: number, pageSize: number) => {
    setPage(nextPage);
    setPageSize(pageSize);
  }, [])

  const sourceData = useTableSourceData(data, tablename, tableParameters);

  const { ColumnsPanelButtons, ColumnsPanel, columnsData } = useColumnsDrawer(columns);

  const { FilterPanelButtons, FilterPanel, filterData } = useFilterDrawer(columnsData, sourceData);

  const dataRef = useTablePrintRef({ filterData, pageSize, setPageSize });

  const tableColumns = useTableColumns({
    dataRef,
    columns: columnsData,
    tableParameters,
    defaultSort,
    dictionary,
    invertDictionary
  });

  const TableTitle = useTableTitle({
    FilterPanelButtons,
    ColumnsPanelButtons,
    filterData,
    page,
    pageSize,
    handleChangePage
  });

  return (
    <ConfigProvider locale={ruRU}>
      {FilterPanel}

      {ColumnsPanel}

      <Table
        ref={dataRef}
        dataSource={ getTableWithPseudoFields(filterData, tableColumns) }
        columns={ tableColumns }
        title={TableTitle}
        tableLayout='auto'
        components={{
          body: {
            row: TableEditableRow,
            cell: DataTableEditableCell
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
        onChange={() => setDefaultSort(false)}
      />
    </ConfigProvider>
  );
}

export default DataTable;
