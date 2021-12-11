import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import useDataSelector from '../../storages/selectors/data';
import useMetadataSelector from '../../storages/selectors/metadata';
import { dataGetAction } from '../../storages/actions/data';
import metadataGetAction from '../../storages/actions/metadata';
import Table from '../UI/Table';
import LoadingComponent from '../UI/LoadingComponent';
// import filterData from '../../utils/filterData';
// import sortData from '../../utils/sortData';
// import mapStringToBoolean from '../../utils/mapStringToBoolean';
import mapMetadataToColumns from '../../utils/mapMetadataToColumns';
import { TData } from '../../types/TData';
import classes from './DataTable.module.scss';

const { Title } = Typography;

const DataTable: React.FC = () => {
  const [columns, setColumns] = useState<TData[] | null>([]);
  const dispatch = useDispatch()
  const { data, isError: isErrorData, isLoading: isLoadingData } = useDataSelector();
  const { data: metadata, isError: isErrorMetadata, isLoading: isLoadingMetadata } = useMetadataSelector();
  console.log(data);
  console.log(metadata);

  useEffect(() => {
    if (metadata) {
      setColumns(mapMetadataToColumns(metadata))
    }
  }, [metadata]);

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
        data && columns && <Table data={data} columns={columns}/>
      )
    )
  )
}

export default DataTable