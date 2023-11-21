import { memo } from 'react';
import { Pagination } from 'antd';

import { TData } from 'interfaces';

import classes from '../index.module.scss';

interface IProps<T> {
  FilterPanelButtons: React.FC;
  ColumnsPanelButtons: React.FC;
  filterData: T[];
  page: number;
  pageSize: number;
  handleChangePage: (nextPage: number, pageSize: number) => void;
}

export const TableTitle = memo(<T extends TData>({
  FilterPanelButtons,
  ColumnsPanelButtons,
  filterData = [],
  page,
  pageSize,
  handleChangePage,
}: IProps<T>) =>
  <div className={classes['table-title']}>
    <div>
      <FilterPanelButtons />

      <ColumnsPanelButtons />
    </div>

    <Pagination
      showSizeChanger
      current={page}
      pageSize={pageSize}
      onChange={handleChangePage}
      total={filterData.length}
    />
  </div>,
);
