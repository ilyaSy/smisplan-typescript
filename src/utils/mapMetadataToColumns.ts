import sortData from './sortData';
// import filterData from './filterData';
import { TColumn } from '../types/TColumn';
import { TData } from '../types/TData';
import { TDictionary } from '../types/TDictionary';

type TMapMetadataToColumns = (
  metadata: TData[],
  dictionary: TDictionary
) => Record<string, TColumn>[]

const mapMetadataToColumns: TMapMetadataToColumns = (metadata, dictionary) => {
  const columns = metadata
    .filter((c) => c.id !== 'specificParameters')
    .map((metadataColumn) => {
      const column: TData = {
        ...metadataColumn,
        dataIndex: metadataColumn.id,
        key: metadataColumn.id,
        sorter: sortData(metadataColumn.id),
      }

      // if (metadataColumn.isFilter && metadataColumn.validValues) {
      //   if (Array.isArray(metadataColumn.validValues)) {
      //     column.filters = metadataColumn.validValues;
      //   } else if (dictionary[metadataColumn.id]) {
      //     column.filters = Object
      //       .entries(dictionary[metadataColumn.id])
      //       .map(([value, text]) => ({ value, text }))
      //       .sort(sortData('text'))
      //   }

      //   column.onFilter = filterData(metadataColumn.id, dictionary);
      // }

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
