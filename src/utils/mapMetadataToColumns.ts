import sortData from './sortData';
import filterData from './filterData';
import { TColumn } from '../types/TColumn';
import { TData } from '../types/TData';

type TMapMetadataToColumns = (
  metadata: Record<string, any>[]
) => Record<string, TColumn>[]

const mapMetadataToColumns: TMapMetadataToColumns = (metadata) => {
  const columns = metadata
    .filter((c) => Object.values(c)[0] !== 'specificParameters')
    .map((c) => {
      const metadataColumn = Object.values(c)[0];
      const column: TData = {
        ...metadataColumn,
        dataIndex: metadataColumn.id,
        key: metadataColumn.id,
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

  return columns;
}

export default mapMetadataToColumns;