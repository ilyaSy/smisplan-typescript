import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import useDataSelector from '../../storages/selectors/data';
import useMetadataSelector from '../../storages/selectors/metadata';
import { dataGetAction } from '../../storages/actions/data';
import metadataGetAction from '../../storages/actions/metadata';
import mapMetadataToColumns from '../../utils/mapMetadataToColumns';
import getTableParameters from '../../utils/getTableParameters';
import { TData } from '../../types/TData';
import { TTableParameters } from '../../types/TTableParameters';
import Table from '../UI/Table';
import LoadingComponent from '../UI/LoadingComponent';
import classes from './DataTable.module.scss';
import useGetTablename from '../../utils/hooks/useGetTablename';

const { Title } = Typography;

const DataTable: React.FC = () => {
  const [columns, setColumns] = useState<TData[] | null>([]);
  const [tableParameters, setTableParameters] = useState<TTableParameters | null>(null);
  
  const dispatch = useDispatch()

  const tablename = useGetTablename();
  
  const { data, isError: isErrorData, isLoading: isLoadingData } = useDataSelector();
  const { data: metadata, isError: isErrorMetadata, isLoading: isLoadingMetadata } = useMetadataSelector();

  useEffect(() => {
    if (metadata) {
      setColumns(mapMetadataToColumns(metadata));
      setTableParameters(getTableParameters(metadata));
    }
  }, [metadata]);

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
        data && columns && tableParameters &&
          <Table data={data} columns={columns} tableParameters={tableParameters}/>
      )
    )
  )
}

export default DataTable