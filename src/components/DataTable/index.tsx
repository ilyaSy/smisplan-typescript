import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { TTableParameters } from '../../types/TTableParameters';
import { mapMetadataToColumns } from '../../utils/mapMetadataToColumns';
import { useGetDataMeta } from '../../utils/hooks/useGetDataMeta';
import { getTableParameters } from '../../utils/getTableParameters';
import { useGetTablename } from '../../utils/hooks/useGetTablename';
import Table from '../UI/Table';
import LoadingComponent from '../UI/LoadingComponent';
import { useDictionaryContext } from '../../context/DictionaryContext';
import classes from './DataTable.module.scss';

const { Title } = Typography;

const DataTable: React.FC = () => {
  const [tableParameters, setTableParameters] = useState<TTableParameters | null>(null);

  const tablename = useGetTablename();
  const { dictionary, invertDictionary } = useDictionaryContext();

  const {
    data: sourceData, isErrorData, isLoadingData,
    metadata, isErrorMetadata, isLoadingMetadata
  } = useGetDataMeta(tablename);

  useEffect(() => {
    if (metadata) {
      setTableParameters(getTableParameters(metadata));
    }
  }, [metadata]);

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
        sourceData && metadata && tableParameters &&
          <Table
            data={sourceData}
            columns={mapMetadataToColumns(metadata)}
            tableParameters={tableParameters}
            tablename={tablename}
            dictionary={dictionary}
            invertDictionary={invertDictionary}
          />
      )
    )
  )
}

export default DataTable
