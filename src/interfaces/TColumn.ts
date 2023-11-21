import { ColumnFilterItem, ColumnType } from 'antd/lib/table/interface';

export type TColumn<T> = {
  dataIndex: string;
  title: string;
  // dataIndex: number;
  isInlineEditable?: boolean;
  showInTable: boolean;
  // type: string;
  isSortable?: boolean;
  sorter?: ColumnType<T>['sorter'];
  isGroup?: boolean;
  // filters?: Record<string, { text: string, value: string }>[];
  filters?: ColumnFilterItem[];
  onFilter?: (value: any, record?: T) => boolean;
  render?: (value: any, record?: T) => string | JSX.Element | null;
};
