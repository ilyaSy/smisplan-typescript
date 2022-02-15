import { TData } from "../types/TData";
import classes from '../components/UI/Table/Table.module.scss';

export const updateTableColumnsWidth = (tableColumns: TData[]): TData[] => {
  return tableColumns.map((tableColumn) => {
    return tableColumn.dataIndex !== 'action'
      ? {
        ...tableColumn,
        className: classes[`table-title-row-${Math.ceil(((tableColumn.title?.length ?? 1)*7 + 48)/10)*10}`],
      }
      : {...tableColumn}
  })
}
