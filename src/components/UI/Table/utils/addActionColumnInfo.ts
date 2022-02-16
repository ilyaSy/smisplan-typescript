import { TData } from "../../../../types/TData";

export const addActionColumnInfo = (columns: TData[], hasActionMenu?: boolean): TData[] => {
  const tableColumns = [...columns];
  if (hasActionMenu) tableColumns.push({
    dataIndex: 'action',
    key: 'action',
    isInlineEditable: false,
    showInTable: true,
    type: 'action',
    className: 'table-action-column',
  })

  return tableColumns;
}
