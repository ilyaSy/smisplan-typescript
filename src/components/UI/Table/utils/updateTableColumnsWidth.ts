import { TData } from 'types';

import classes from '../Table.module.scss';

export const updateTableColumnsWidth = (tableColumns: TData[]): TData[] =>
  tableColumns.map((tableColumn) => {
    const widthNumber = Math.ceil(((tableColumn.title?.length ?? 1) * 7 + 48 + (tableColumn.isGroup && 96)) / 10) * 10;

    return tableColumn.dataIndex !== 'action'
      ? {
        ...tableColumn,
        className: tableColumn.className + ' ' + classes[`table-title-row-${widthNumber}`],
      }
      : { ...tableColumn };
  });
