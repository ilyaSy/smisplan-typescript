export type TColumn<T> = {
  dataIndex: keyof T;
  title: string;
  // dataIndex: number;
  isInlineEditable?: boolean;
  showInTable: boolean;
  // type: string;
  sorter?: Function;
  isGroup?: boolean;
  isSort?: boolean;
  filters?: Record<string, { text: string, value: string }>[];
  onFilter?: Function;
  render?: (value: any, record?: any) => string | JSX.Element | null;
};
