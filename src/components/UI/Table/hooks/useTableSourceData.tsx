import { useMemo } from "react"
import { TData } from "../../../../types/TData"
import { TTableParameters } from "../../../../types/TTableParameters"
import ActionMenu from "../../../ActionMenu"

export const useTableSourceData = (data: TData[], tablename: string, tableParameters: TTableParameters) => {
  return useMemo<TData[]>(() => {
    return data.map((dataItem, index) => {
      return {
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
        : null
      }
    })
  }, [data, tableParameters, tablename])
}
