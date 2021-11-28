import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingComponent: React.FC = () => {
  return (
    // <div style={{ textAlign: 'center', paddingTop: '200px' }}>
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 240 }} spin />}
      style={{ width: '100%', height: '100%' }}
    />
    // </div>
  );
};

export default React.memo(LoadingComponent);
