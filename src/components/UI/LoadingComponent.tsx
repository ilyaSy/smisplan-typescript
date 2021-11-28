import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const LoadingComponent: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '200px' }}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
};

export default LoadingComponent;
