import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import useDataSelector from '../../storages/selectors/data';
import useMetadataSelector from '../../storages/selectors/metadata';
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

const { Title } = Typography;

const DataTable: React.FC = () => {
  const [sourceData, setSourceData] = useState<TData[]>([]);
  const [columns, setColumns] = useState<TData[] | null>([]);
  const [tableParameters, setTableParameters] = useState<TTableParameters | null>(null);
  
  const { dictionary, setDictionary } = useDictionaryContext();

  const dispatch = useDispatch()

  const tablename = useGetTablename();
  
  const { data: tableData, isError: isErrorData, isLoading: isLoadingData } = useDataSelector();
  const { data: metadata, isError: isErrorMetadata, isLoading: isLoadingMetadata } = useMetadataSelector();

  useEffect(() => {
    if (tableData) setSourceData(tableData);
  }, [tableData]);

  useEffect(() => {
    if (metadata) {
      setColumns(mapMetadataToColumns(metadata));
      setTableParameters(getTableParameters(metadata));

      metadata
        .filter((property) => property.id !== 'specificParameters')
        .forEach((property) => {
          if (property.validValues) {
            setDictionary(property.id, property.validValues);
          }
        })
    }
  }, [metadata, setDictionary]);

  useEffect(() => {    
    if (tableData && metadata && Object.keys(dictionary).length) {
      setSourceData((prev) => {
        return prev.map((data) => {
          return Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
              const metadataProperty = metadata.find((property) => property.id === key);
              if (metadataProperty?.validValues && dictionary[key] && dictionary[key][value]) {
                data[key] = dictionary[key][value]
              }
              return [key, data[key]];
            })
          )
        })
      });
    }
  }, [tableData, metadata, dictionary]);

  useEffect(() => {
    dispatch(dataGetAction(tablename));
    dispatch(metadataGetAction(tablename));
  }, [dispatch, tablename]);

  return (
    isLoadingData || isLoadingMetadata ? (
      <div className={classes.center}>
        <LoadingComponent />
      </div>
    ) : (
      isErrorData || isErrorMetadata ? (
        <div className={classes.center}>
          <Title level={3}>Ошибка получения данных</Title>
        </div>
      ) : (
        tableData && columns && tableParameters &&
          <Table data={sourceData} columns={columns} tableParameters={tableParameters}/>
      )
    )
  )
}

export default DataTable