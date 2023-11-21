import { TData } from 'interfaces';

import classes from '../index.module.scss';

export const updateTableColumnsWidth = <T extends TData>(tableColumns: T[]): T[] =>
  tableColumns.map((tableColumn) => {
    const widthNumber = Math.ceil(((tableColumn.title?.length ?? 1) * 7 + 48 + (tableColumn?.isGroup ? 96 : 0)) / 10) * 10;

    return tableColumn.dataIndex === 'action'
      ? { ...tableColumn }
      : {
        ...tableColumn,
        className: (tableColumn as any).className + ' ' + classes[`table-title-row-${widthNumber}`],
      };
  });
