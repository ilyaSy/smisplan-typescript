import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfigProvider, Pagination, Table, Tag } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import ruRU from 'antd/lib/locale/ru_RU';
import { TData } from '../../../types/TData';
import { TDictionary } from '../../../types/TDictionary';
import { TTableParameters } from '../../../types/TTableParameters';
import { TObject } from '../../../types/TObject';
import TableEditableRow from '../TableEditableRow';
import DataTableEditableCell from '../../TableEditableCell';
import TableExpandableRow from '../TableExpandableRow';
import TableFilterIcon from '../TableFilterIcon';
import ActionMenu from '../../ActionMenu';
import { usePrintPDFContext } from '../../../context/PrintPDFContext';
import { useFilterDrawer } from '../FilterPanel';
import { useColumnsDrawer } from '../ColumnsPanel';
import classes from './Table.module.scss';
import './Table.css';
import { getTableWithPseudoFields } from '../../../utils/getTableWithPseudoFields';
import { updateTableColumnsWidth } from '../../../utils/updateTableColumnsWidth';
import { addActionColumnInfo } from '../../../utils/addActionColumnInfo';

type TTableProps = {
  data: TData[],
  columns: TData[],
  tableParameters: TTableParameters,
  tablename: string,
  dictionary: TDictionary
  invertDictionary: TObject<Record<string, string>>
};

const PAGE_SIZE = 10;

const DataTable: React.FC<TTableProps> = ({
  data,
  columns,
  tableParameters,
  tablename,
  dictionary,
  invertDictionary
}) => {
  const { setDataPrintRef, setDataPrintMode, dataPrintMode } = usePrintPDFContext();
  const dataRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [defaultSort, setDefaultSort] = useState<boolean>(true);

  const hasActionMenu = tableParameters.hasActionMenu;

  useEffect(() => {
    if (dataRef) setDataPrintRef(dataRef)
  }, [setDataPrintRef]);

  const sourceData = useMemo(() => {
    return data.map((dataItem, index) => {
      return {
        ...dataItem,
        key: `table-row-${dataItem.id}-${index}`,
        action: hasActionMenu
        ? <ActionMenu
            key={`action-menu-${dataItem.id}-${index}`}
            title='Меню действий'
            dataItem={dataItem}
            tableParameters={tableParameters}
            tablename={tablename}
          />
        : null
      }
    })
  }, [data, tableParameters, hasActionMenu, tablename])

  const getDefaultSorter = (field: string) => {
    if (Array.isArray(tableParameters.defaultSortField)) {
      const index = tableParameters.defaultSortField.indexOf(field);

      return index < 0
        ? null
        : (tableParameters.defaultSortDirection as string[])[index];
    }
    return field === tableParameters.defaultSortField
      ? tableParameters.defaultSortDirection
      : null;
  }

  const { ColumnsPanelButtons, ColumnsPanel, columnsData } = useColumnsDrawer(columns);

  let tableColumns: TData[] = columnsData
    .map((column) => {
      const tableColumn: TData = {
        ...column,
        filterIcon: TableFilterIcon,
      };

      if (!column.isInlineEditable) {
        tableColumn.render = (text: string, record: TData) => {
          const columnId = column.dataIndex;
          const tableValue = record[columnId];
          const originalValue = invertDictionary[columnId] && invertDictionary[columnId][tableValue]
            ? invertDictionary[columnId][tableValue]
            : tableValue;

          return column.isTagged
            ? <Tag color={dictionary[columnId][originalValue]?.tag}>{text}</Tag>
            : text
        };
      } else {
        tableColumn.onCell = (record: any) => ({
          record,
          editable: column.isInlineEditable,
          dataIndex: column.dataIndex,
          title: column.title,
        });
      }

      const sortOrder = (getDefaultSorter(column.dataIndex)) as SortOrder;
      if (sortOrder && defaultSort) tableColumn.sortOrder = sortOrder;

      return tableColumn;
      }
    )

  tableColumns = addActionColumnInfo(tableColumns, hasActionMenu);
  tableColumns = updateTableColumnsWidth(tableColumns);

  const { FilterButtons, FilterPanel, filterData } = useFilterDrawer(columnsData, sourceData);

  const handleChangePage = useCallback((nextPage: number, pageSize: number) => {
    setPage(nextPage);
    setPageSize(pageSize);
  }, [])

  const TableTitle = useCallback(() => (
    <div className={classes['table-title']}>
      <div>
        {FilterButtons}

        {ColumnsPanelButtons}
      </div>

      <Pagination
        showSizeChanger
        current={page}
        pageSize={pageSize}
        onChange={handleChangePage}
        total={(filterData || []).length}
      />
    </div>
  ), [ FilterButtons, ColumnsPanelButtons, filterData, page, pageSize, handleChangePage ]);

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
