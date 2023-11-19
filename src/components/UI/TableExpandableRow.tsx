import { ReactElement } from 'react';

import { TData } from 'interfaces';

const TableExpandableRow = (key: keyof TData) => ({
  rowExpandable: (record: TData): boolean => Boolean(record[key]),
  expandedRowRender: (record: TData): ReactElement => <p>{record[key]}</p>,
});

export default TableExpandableRow;
