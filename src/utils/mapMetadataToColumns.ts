import sortData from './sortData';
import { TColumn } from '../types/TColumn';
import { TData } from '../types/TData';

type TMapMetadataToColumns = (
  metadata: TData[],
) => Record<string, TColumn>[]

export const mapMetadataToColumns: TMapMetadataToColumns = (metadata) => {
  const columns = metadata
    .filter((c) => c.id !== 'specificParameters')
    .map((metadataColumn) => {
      const column: TData = {
        ...metadataColumn,
        dataIndex: metadataColumn.id,
        key: metadataColumn.id,
        sorter: {
          compare: sortData(metadataColumn.id, undefined, metadataColumn.type),
          multiple: 1,
        },
      }

      return column;
    })
    .sort((a, b) => a.tableIndex - b.tableIndex)
    // .filter((c: any) => !filterRealColumns || (filterRealColumns && c.showInTable && c.type !== 'fulltext'))

  return columns;
}
