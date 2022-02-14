import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfigProvider, Pagination, Table, Tag } from 'antd';
import { invert } from 'lodash';
import { SortOrder } from 'antd/lib/table/interface';
import ruRU from 'antd/lib/locale/ru_RU';
import TableEditableRow from '../TableEditableRow';
import DataTableEditableCell from '../../TableEditableCell';
import TableExpandableRow from '../TableExpandableRow';
import TableFilterIcon from '../TableFilterIcon';
import ActionMenu from '../../ActionMenu';
import { TData } from '../../../types/TData';
import { TDictionary } from '../../../types/TDictionary';
import { TTableParameters } from '../../../types/TTableParameters';
import { usePrintPDFContext } from '../../../context/PrintPDFContext';
import { useFilterDrawer } from '../FilterPanel';
import { useColumnsDrawer } from '../ColumnsPanel';
import classes from './Table.module.scss';
import './Table.css';

type TTableProps = {
  data: TData[],
  columns: TData[],
  tableParameters: TTableParameters,
  tablename: string,
  dictionary: TDictionary
};

const PAGE_SIZE = 10;

const DataTable: React.FC<TTableProps> = ({ data, columns, tableParameters, tablename, dictionary }) => {
  const { setDataPrintRef, setDataPrintMode, dataPrintMode } = usePrintPDFContext();
  const dataRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);

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
        ? undefined
        : (tableParameters.defaultSortDirection as string[])[index];
    }
    return field === tableParameters.defaultSortField
      ? tableParameters.defaultSortDirection
      : undefined;
  }

  const {
    ColumnsPanelButtons,
    ColumnsPanel,
    columnsData
  } = useColumnsDrawer(columns);

  const tableColumns: TData[] = columnsData
    .map((column) => {
      let invertDictionary: Record<string, string> = {};
      if (dictionary[column.dataIndex]) {
        invertDictionary = invert(
          Object.fromEntries(Object.entries(dictionary[column.dataIndex]).map(([key, info]) => [key, info.text]))
        );
      }

      return !column.isInlineEditable
        ? {
            ...column,
            defaultSortOrder: (getDefaultSorter(column.dataIndex)) as SortOrder,
            sortOrder: (getDefaultSorter(column.dataIndex)) as SortOrder,
            filterIcon: TableFilterIcon,
            render: (text: string, record: TData) => {
              return column.isTagged
                ? <Tag color={dictionary[column.dataIndex][invertDictionary[record[column.dataIndex]]]?.tag}>{text}</Tag>
                : text
            }
          }
          : {
            ...column,
            defaultSortOrder: (getDefaultSorter(column.dataIndex)) as SortOrder,
            sortOrder: (getDefaultSorter(column.dataIndex)) as SortOrder,
            filterIcon: TableFilterIcon,
            onCell: (record: any) => ({
              record,
              editable: column.isInlineEditable,
              dataIndex: column.dataIndex,
              title: column.title,
            }),
          }
      }
    )

  if (hasActionMenu) tableColumns.push({
    dataIndex: 'action',
    key: 'action',
    isInlineEditable: false,
    showInTable: true,
    type: 'action',
    className: 'table-action-column',
  })

  tableColumns.forEach((tableColumn) => {
    if (tableColumn.dataIndex !== 'action') {
      tableColumn.className = classes[`table-title-row-${Math.ceil(((tableColumn.title?.length ?? 1)*7 + 48)/10)*10}`];
    }
  })

  const {
    FilterButtons,
    FilterPanel,
    filterData
  } = useFilterDrawer(columnsData, sourceData);

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
  ), [
    FilterButtons,
    ColumnsPanelButtons,
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
    // <>
    <ConfigProvider locale={ruRU}>
      {FilterPanel}

      {ColumnsPanel}

      <Table
        ref={dataRef}
        dataSource={ filterData }
        columns={ tableColumns }
        title={TableTitle}
        // scroll={{x: 'max-content'}}
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
      />
    </ConfigProvider>
    // </>
  );
}

export default DataTable;
