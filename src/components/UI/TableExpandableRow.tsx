import { ReactElement } from 'react';
import { TData } from '../../types/TData';

const TableExpandableRow = (key: keyof TData) => {
  return {
    rowExpandable: (record: TData): boolean => !!record[key],
    expandedRowRender: (record: TData): ReactElement => {
      return <p>{record[key]}</p>
    }
  }
};

export default TableExpandableRow;