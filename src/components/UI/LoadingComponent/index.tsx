import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './LoadingComponent.module.scss';

const LoadingComponent: React.FC = () => {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 240 }} spin />}
      // style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      className={classes['loading-component']}
    />
  );
};

export default React.memo(LoadingComponent);
