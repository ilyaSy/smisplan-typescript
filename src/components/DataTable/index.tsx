import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import mapMetadataToColumns from '../../utils/mapMetadataToColumns';
import getTableParameters from '../../utils/getTableParameters';
import useGetTablename from '../../utils/hooks/useGetTablename';
import Table from '../UI/Table';
import LoadingComponent from '../UI/LoadingComponent';
import { TTableParameters } from '../../types/TTableParameters';
import { useGetDataMeta } from '../../utils/hooks/useGetDataMeta';
import classes from './DataTable.module.scss';

const { Title } = Typography;

const DataTable: React.FC = () => {
  const [tableParameters, setTableParameters] = useState<TTableParameters | null>(null);

  const tablename = useGetTablename();

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
            columns={mapMetadataToColumns(metadata, false)}
            tableParameters={tableParameters}
          />
      )
    )
  )
}

export default DataTable
