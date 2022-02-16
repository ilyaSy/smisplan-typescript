import { TData } from "../../../../types/TData";
import classes from '../Table.module.scss';

export const updateTableColumnsWidth = (tableColumns: TData[]): TData[] => {
  return tableColumns.map((tableColumn, index: number) => {
    return tableColumn.dataIndex !== 'action'
      ? {
        ...tableColumn,
        className:
          tableColumn.className + ' ' +
          classes[`table-title-row-${Math.ceil(((tableColumn.title?.length ?? 1)*7 + 48 + (tableColumn.isGroup && 96))/10)*10}`],
      }
      : {...tableColumn}
  })
}
