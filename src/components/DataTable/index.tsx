import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

import { TTableParameters } from 'types';
import { mapMetadataToColumns, getTableParameters } from 'utils';
import { useGetDataMeta, useGetTablename } from 'hooks';
import { useDictionaryContext } from 'context/DictionaryContext';
import { LoadingComponent } from 'components/UI/LoadingComponent';
import Table from 'components/UI/Table';

import classes from './DataTable.module.scss';

const { Title } = Typography;

const DataTable: React.FC = () => {
  const [tableParameters, setTableParameters] = useState<TTableParameters | null>(null);

  const tablename = useGetTablename();
  const { dictionary, invertDictionary } = useDictionaryContext();

  const {
    data: sourceData, isErrorData, isLoadingData,
    metadata, isErrorMetadata, isLoadingMetadata,
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
  );
};

export default DataTable;
