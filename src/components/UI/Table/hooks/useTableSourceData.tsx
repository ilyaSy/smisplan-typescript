import { useMemo } from 'react';

import { TData, TTableParameters } from 'interfaces';
import ActionMenu from 'components/ActionMenu';

export const useTableSourceData = (data: TData[], tablename: string, tableParameters: TTableParameters) =>
  useMemo<TData[]>(() => data.map((dataItem, index) => ({
    ...dataItem,
    key: `table-row-${dataItem.id}-${index}`,
    action: tableParameters.hasActionMenu
      ? <ActionMenu
        key={`action-menu-${dataItem.id}-${index}`}
        title='Меню действий'
        dataItem={dataItem}
        tableParameters={tableParameters}
        tablename={tablename}
      />
      : null,
  })), [data, tableParameters, tablename]);
