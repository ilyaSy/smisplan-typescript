import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import useDataSelector from '../../storages/selectors/data';
import useMetadataSelector from '../../storages/selectors/metadata';
import { dataGetAction } from '../../storages/actions/data';
import metadataGetAction from '../../storages/actions/metadata';
import Table from '../UI/Table';
import LoadingComponent from '../UI/LoadingComponent';
import classes from './DataTable.module.scss';

const { Title } = Typography;

const DataTable: React.FC = () => {
  const dispatch = useDispatch()
  const { data, isError: isErrorData, isLoading: isLoadingData } = useDataSelector();
  const { data: metadata, isError: isErrorMetadata, isLoading: isLoadingMetadata } = useMetadataSelector();
  console.log(data);
  console.log(metadata);

  useEffect(() => {
    dispatch(dataGetAction());
    dispatch(metadataGetAction());
  }, [dispatch]);

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
        data && metadata && <Table data={data} columns={metadata}/>
      )
    )
  )
}

export default DataTable