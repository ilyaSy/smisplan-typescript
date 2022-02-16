import { useCallback } from "react";
import { Pagination } from "antd";
import { TData } from "../../../../types/TData";
import classes from '../Table.module.scss';

interface IUseTableTitle {
  FilterPanelButtons: JSX.Element;
  ColumnsPanelButtons: JSX.Element;
  filterData: TData[];
  page: number;
  pageSize: number;
  handleChangePage: (nextPage: number, pageSize: number) => void;
}

export const useTableTitle = ({
  FilterPanelButtons,
  ColumnsPanelButtons,
  filterData,
  page,
  pageSize,
  handleChangePage,
}: IUseTableTitle) => {
  const TableTitle = useCallback(() => (
    <div className={classes['table-title']}>
      <div>
        {FilterPanelButtons}

        {ColumnsPanelButtons}
      </div>

      <Pagination
        showSizeChanger
        current={page}
        pageSize={pageSize}
        onChange={handleChangePage}
        total={(filterData || []).length}
      />
    </div>
  ), [
    FilterPanelButtons,
    ColumnsPanelButtons,
    filterData,
    page,
    pageSize,
    handleChangePage
  ]);

  return TableTitle;
}
