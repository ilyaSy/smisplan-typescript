import { SortOrder } from 'antd/lib/table/interface';

import { TData, TDataTypes } from 'interfaces';

export const sortData =
  (key: string, direction: SortOrder = 'ascend', type?: TDataTypes) =>
    (a: TData, b: TData) => {
      const valueA = type && type === 'number' ? +a[key] : a[key];
      const valueB = type && type === 'number' ? +b[key] : b[key];

      if (valueA < valueB) return direction === 'ascend' ? -1 : 1;
      if (valueA > valueB) return direction === 'ascend' ? 1 : -1;

      return 0;
    };
