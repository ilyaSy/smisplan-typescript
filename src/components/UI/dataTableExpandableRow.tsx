import { ReactElement } from 'react';
import { TData } from '../../types/TData';

const dataTableExpandableRow = (key: keyof TData) => {
  return {
    rowExpandable: (record: TData): boolean => !!record[key],
    expandedRowRender: (record: TData): ReactElement => {
      return <p>{record[key]}</p>
    }
  }
};

export default dataTableExpandableRow;