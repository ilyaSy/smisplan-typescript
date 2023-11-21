import { Typography } from 'antd';

import { IDiscussion } from 'interfaces';
import { config, getColumns } from './consts';
import { useGetData } from 'hooks';
import { LoadingComponent } from 'components/UI/LoadingComponent';
import Table from 'components/UI/Table';

import classes from './index.module.scss';

const { Title } = Typography;

export const Discussion: React.FC = () => {
  const { data: sourceData, isError, isLoading } = useGetData<IDiscussion>(config.tableName);

  const columns = getColumns();

  return (
    <>
      {isLoading &&
        <div className={classes.center}>
          <LoadingComponent />
        </div>}

      {(isError && !sourceData) &&
        <div className={classes.center}>
          <Title level={3}>Ошибка получения данных</Title>
        </div>}

      {sourceData &&
        <Table
          data={sourceData}
          columns={columns}
          parameters={config?.parameters}
        />}
    </>
  );
};
