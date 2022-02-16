import { MouseEventHandler, useCallback, useState } from "react";
import { Button, Tag, Tooltip } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import { GroupOutlined } from "@ant-design/icons";
import { TData } from "../../../../types/TData";
import { TDictionary } from "../../../../types/TDictionary";
import { TObject } from "../../../../types/TObject";
import { TTableParameters } from "../../../../types/TTableParameters";
import { addActionColumnInfo } from "../utils/addActionColumnInfo";
import { updateTableColumnsWidth } from "../utils/updateTableColumnsWidth";
import { getGroupColumnData } from "../utils/getGroupColumnData";
import TableFilterIcon from "../../TableFilterIcon";
import classes from "../Table.module.scss";

interface IUseTableColumns {
  columns: TData[],
  dataRef: React.RefObject<HTMLDivElement>,
  tableParameters: TTableParameters,
  defaultSort: boolean,
  dictionary: TDictionary,
  invertDictionary: TObject<Record<string, string>>
};

export const useTableColumns = ({
  columns,
  dataRef,
  tableParameters,
  defaultSort,
  dictionary,
  invertDictionary
}: IUseTableColumns) => {
  const [groupField, setGroupField] = useState<string>();

  const getDefaultSorter = useCallback((field: string) => {
    if (Array.isArray(tableParameters.defaultSortField)) {
      const index = tableParameters.defaultSortField.indexOf(field);

      return index < 0
        ? null
        : (tableParameters.defaultSortDirection as string[])[index];
    }
    return field === tableParameters.defaultSortField
      ? tableParameters.defaultSortDirection
      : null;
  }, [tableParameters]);

  let tableColumns: TData[] = columns
    .map((column: TData, columnIndex: number) => {
      const columnId = column.dataIndex;
      const tableColumn: TData = {
        ...column,
        className: `data-table-cell-${columnIndex}`,
        filterIcon: TableFilterIcon,
      };

      if (!column.isInlineEditable) {
        tableColumn.render = (text: string, record: TData, index: number) => {
          if (column.isTagged) {
            const tableValue = record[columnId];
            const originalValue = invertDictionary[columnId] && invertDictionary[columnId][tableValue]
              ? invertDictionary[columnId][tableValue]
              : tableValue;

            return <Tag color={dictionary[columnId][originalValue]?.tag}>{text}</Tag>
          }
          return text;
        }

        if (tableColumn.isGroup) {
          const handleGroup: MouseEventHandler<HTMLElement> = (event) => {
            event.stopPropagation();
            setGroupField((prev) => columnId === prev ? undefined : columnId);
          }

          tableColumn.title = <div className={classes['table-header-group-cell']}>
            {column.title}
            <Tooltip title={columnId === groupField ? 'Нажмите чтобы убрать группировку по полю' : 'Нажмите для группировки по полю'}>
              <Button
                className={classes['table-header-group-button']}
                icon={<GroupOutlined />}
                onClick={handleGroup}
                type={columnId === groupField ? 'link' : 'default'}
              />
            </Tooltip>
          </div>;

          if (columnId === groupField) {
            const groupColumnData = getGroupColumnData(dataRef, columnIndex);

            tableColumn.onCell = (record: TData, index: number) => {
              if (index && groupColumnData[index-1] === '' + record[columnId]) {
                return { rowSpan: 0 };
              }

              let count = 0;
              for (let i = index; i < groupColumnData.length; i++) {
                const cellGroupData = groupColumnData[i];
                if ( cellGroupData !== '' + record[columnId] && count ) {
                  break;
                } else if (cellGroupData === '' + record[columnId]) {
                  count++;
                }
              }

              return { rowSpan: count }
            }
          };
        }
      } else {
        tableColumn.onCell = (record: TData) => ({
          record,
          editable: column.isInlineEditable,
          dataIndex: columnId,
          title: column.title,
        });
      }

      const sortOrder = (getDefaultSorter(column.dataIndex)) as SortOrder;
      if (sortOrder && defaultSort) tableColumn.sortOrder = sortOrder;

      return tableColumn;
    })

  tableColumns = addActionColumnInfo(tableColumns, tableParameters.hasActionMenu);
  tableColumns = updateTableColumnsWidth(tableColumns);

  return tableColumns;
}
