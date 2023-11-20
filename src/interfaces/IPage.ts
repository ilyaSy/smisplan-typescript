import { SortOrder } from 'antd/lib/table/interface';

export interface IPage {
  url: string;
  tableName: string;
  label: string,
  order: number;

  parameters?: {
    defaultSortField: string | string[],
    defaultSortDirection: SortOrder | SortOrder[],
  },
}
