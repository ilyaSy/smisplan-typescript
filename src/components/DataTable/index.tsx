import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
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
  const [columns, setColumns] = useState<TData[] | null>([]);
  const [tableParameters, setTableParameters] = useState<TTableParameters | null>(null);

  const { dictionary } = useDictionaryContext();

  const tablename = useGetTablename();

  const {
    data: sourceData, isErrorData, isLoadingData,
    metadata, isErrorMetadata, isLoadingMetadata
  } = useGetDataMeta(tablename);

  useEffect(() => {
    if (metadata) {
      setColumns(mapMetadataToColumns(metadata, dictionary));
      setTableParameters(getTableParameters(metadata));
    }
  }, [metadata, dictionary]);

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
