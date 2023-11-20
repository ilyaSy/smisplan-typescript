import { ReactElement } from 'react';

import { TData } from 'interfaces';

export const TableExpandableRow = (key: keyof TData) => ({
  rowExpandable: (record: TData): boolean => Boolean(record[key]),
  expandedRowRender: (record: TData): ReactElement => <p>{record[key]}</p>,
});
