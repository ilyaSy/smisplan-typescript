import sortData from './sortData';
import { TColumn } from '../types/TColumn';
import { TData } from '../types/TData';

type TMapMetadataToColumns = (
  metadata: TData[],
) => Record<string, TColumn>[]

const mapMetadataToColumns: TMapMetadataToColumns = (metadata) => {
  const columns = metadata
    .filter((c) => c.id !== 'specificParameters')
    .map((metadataColumn) => {
      const column: TData = {
        ...metadataColumn,
        dataIndex: metadataColumn.id,
        key: metadataColumn.id,
        sorter: sortData(metadataColumn.id, undefined, metadataColumn.type),
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
    type: 'action',
    className: 'table-action-column'
  });

  return columns;
}

export default mapMetadataToColumns;
