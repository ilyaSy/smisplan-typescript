import React, { useEffect, useState } from 'react'; // useCallback,
// import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { mapValues } from 'lodash';
// import useDataSelector from '../../storages/selectors/data';
// import useMetadataSelector from '../../storages/selectors/metadata';
import { dataGetAction } from '../../storages/actions/data';
import metadataGetAction from '../../storages/actions/metadata';
import mapMetadataToColumns from '../../utils/mapMetadataToColumns';
import getTableParameters from '../../utils/getTableParameters';
import useGetTablename from '../../utils/hooks/useGetTablename';
import Table from '../UI/Table';
import LoadingComponent from '../UI/LoadingComponent';
import { TData } from '../../types/TData';
import { TTableParameters } from '../../types/TTableParameters';
import classes from './DataTable.module.scss';
import useDictionaryContext from '../../context/DictionaryContext';
import { useGetDataMeta } from '../../utils/hooks/useGetDataMeta';

const { Title } = Typography;

const DataTable: React.FC = () => {
  // const [sourceData, setSourceData] = useState<TData[]>([]);
  const [columns, setColumns] = useState<TData[] | null>([]);
  const [tableParameters, setTableParameters] = useState<TTableParameters | null>(null);

  const { dictionary } = useDictionaryContext();

  // const dispatch = useDispatch()

  const tablename = useGetTablename();

  // const { data: tableData, isError: isErrorData, isLoading: isLoadingData } = useDataSelector();
  // const { data: metadata, isError: isErrorMetadata, isLoading: isLoadingMetadata } = useMetadataSelector();

  const {
    data: sourceData, isErrorData, isLoadingData,
    metadata, isErrorMetadata, isLoadingMetadata
  } = useGetDataMeta(tablename);

  // const mapDictionaryCb = useCallback((value: string, key: string) => {
  //   const metadataProperty = metadata?.find((property) => property.id === key);
  //   if (metadataProperty && metadataProperty.type === 'multi-select' && dictionary[key]){
  //     return value.split(',').map((v) => dictionary[key][v]).join(', ')
  //   } else if (metadataProperty && metadataProperty.type === 'select' && dictionary[key] && dictionary[key][value]) {
  //     return dictionary[key][value]
  //   }
  //   return value;
  // }, [metadata, dictionary])

  // useEffect(() => {
  //   if (tableData) setSourceData(tableData);
  // }, [tableData]);

  useEffect(() => {
    if (metadata) {
      setColumns(mapMetadataToColumns(metadata, dictionary));
      setTableParameters(getTableParameters(metadata));
    }
  }, [metadata, dictionary]);

  // useEffect(() => {
  //   if (metadata) {
  //     metadata
  //       .filter((property) => ['select', 'multi-select'].includes(property.type))
  //       .forEach((property) => setDictionary(property.id, property.validValues))
  //   }
  // }, [metadata, setDictionary]);

  // useEffect(() => {
  //   if (tableData && metadata && Object.keys(dictionary).length) {
  //     setSourceData(() => tableData.map((data) => mapValues(data, mapDictionaryCb)));
  //   }
  // }, [tableData, metadata, dictionary, mapDictionaryCb]);

  // useEffect(() => {
  //   dispatch(dataGetAction(tablename));
  //   dispatch(metadataGetAction(tablename));
  // }, [dispatch, tablename]);

  return (
    isLoadingData || isLoadingMetadata ? (
      <div className={classes.center}>
        <LoadingComponent />
      </div>
    ) : (
      (isErrorData || isErrorMetadata) && !sourceData ? (
        <div className={classes.center}>
          <Title level={3}>Ошибка получения данных</Title>
        </div>
      ) : (
        sourceData && columns && tableParameters &&
          <Table data={sourceData} columns={columns} tableParameters={tableParameters}/>
      )
    )
  )
}

export default DataTable
