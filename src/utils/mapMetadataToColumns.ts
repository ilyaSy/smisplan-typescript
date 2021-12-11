import sortData from './sortData';
import filterData from './filterData';
import { TColumn } from '../types/TColumn';
import { TData } from '../types/TData';

type TMapMetadataToColumns = (
  metadata: Record<string, any>[]
) => Record<string, TColumn>[]

const mapMetadataToColumns: TMapMetadataToColumns = (metadata) => {
  const columns = metadata
    .map((c) => {
      const metadataColumn = Object.values(c)[0];
      const column: TData = {
        title: metadataColumn.title,
        dataIndex: metadataColumn.id,
        key: metadataColumn.id,
        tableIndex: metadataColumn.tableIndex,
        isInlineEditable: metadataColumn.isInlineEditable,
        isEditable: metadataColumn.isEditable,
        showInTable: metadataColumn.showInTable,
        type: metadataColumn.type,
        sorter: sortData(metadataColumn.id),
      }

      if (metadataColumn.isFilter && metadataColumn.validValues) {
        column.filters = metadataColumn.validValues;
        column.onFilter = filterData(metadataColumn.id);
      }

      return column;
    })
    .sort((a, b) => a.tableIndex - b.tableIndex)
    .filter((c: any) => c.showInTable && c.type !== 'fulltext')
  
  // last column with action menu
  columns.push({
    dataIndex: 'action',
    key: 'action',
    isInlineEditable: false,
    showInTable: true,
    type: 'action'
  });

  console.log(columns);

  return columns;
}

export default mapMetadataToColumns;