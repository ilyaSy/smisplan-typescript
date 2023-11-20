/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEventHandler, useCallback, useState } from 'react';
import { Button, Tag, Tooltip } from 'antd';
import { GroupOutlined } from '@ant-design/icons';
import { SortOrder } from 'antd/lib/table/interface';

import { TData, TTableParameters, TDictionary, TObject, IPage, TColumn } from 'interfaces';
import { updateTableColumnsWidth } from '../utils/updateTableColumnsWidth';
import { addActionColumnInfo } from '../utils/addActionColumnInfo';
import { getGroupColumnData } from '../utils/getGroupColumnData';
import TableFilterIcon from 'components/UI/TableFilterIcon';

import classes from '../index.module.scss';

interface IUseTableColumns {
  columns: TColumn<any>[],
  dataRef: React.RefObject<HTMLDivElement>,
  // tableParameters: TTableParameters,
  defaultSort: boolean,
  sortConfig?: IPage['parameters'];
  // dictionary: TDictionary,
  // invertDictionary: TObject<Record<string, string>>
}

export const useTableColumns = ({
  dataRef,
  columns,
  // tableParameters,
  defaultSort,
  sortConfig,
  // dictionary,
  // invertDictionary,
}: IUseTableColumns) => {
  const [groupField, setGroupField] = useState<string>();

  const getDefaultSorter = useCallback((field: string) => {
    // columns.find[field].isSort

    if (!sortConfig) return null;

    if (Array.isArray(sortConfig.defaultSortField)) {
      const index = sortConfig.defaultSortField.indexOf(field);

      return index < 0
        ? null
        : (sortConfig.defaultSortDirection as string[])[index];
    }

    return field === sortConfig.defaultSortField
      ? sortConfig.defaultSortDirection
      : null;
  }, [sortConfig]);

  let tableColumns = columns
    .map((column, columnIndex) => {
      // console.info(column);

      const columnId = column.dataIndex;
      const tableColumn: TData = {
        ...column,
        className: `data-table-cell-${columnIndex}`,
        filterIcon: TableFilterIcon,
      };

      const groupByTooltip = columnId === groupField
        ? 'Нажмите чтобы убрать группировку по полю'
        : 'Нажмите для группировки по полю';

      if (!column.isInlineEditable) {
        tableColumn.render = (text: any, record: TData) => {
          if (column.render) {
            return column.render(record);
          }

          return text;
        };

        if (tableColumn.isGroup) {
          const handleGroup: MouseEventHandler<HTMLElement> = (event) => {
            event.stopPropagation();
            setGroupField((prev) => columnId === prev ? undefined : columnId as string);
          };

          tableColumn.title = <div className={classes['table-header-group-cell']}>
            {column.title}
            <Tooltip title={groupByTooltip}>
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
              if (index && groupColumnData[index - 1] === '' + record[columnId]) {
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

              return { rowSpan: count };
            };
          }
        }
      } else {
        tableColumn.onCell = (record: TData) => ({
          record,
          editable: column.isInlineEditable,
          dataIndex: columnId,
          title: column.title,
        });
      }

      const sortOrder = (getDefaultSorter(column.dataIndex as string)) as SortOrder;

      if (sortOrder && defaultSort) tableColumn.sortOrder = sortOrder;

      return tableColumn;
    });

  // tableColumns = addActionColumnInfo(tableColumns, tableParameters.hasActionMenu);
  tableColumns = updateTableColumnsWidth(tableColumns);

  return tableColumns;
};
