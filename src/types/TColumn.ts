export type TColumn = {
  title: string,
  dataIndex: number,
  key: string,
  isInlineEditable: boolean,
  showInTable: boolean,
  type: string,
  sorter?: Function,
  filters?: Record<string, {text: string, value: string}>[]
  onFilter?: Function,
};