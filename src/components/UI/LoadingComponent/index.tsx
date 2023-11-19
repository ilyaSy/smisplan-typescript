import { memo } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './index.module.scss';

export const LoadingComponent: React.FC = memo(() => (
  <Spin
    indicator={<LoadingOutlined style={{ fontSize: 240 }} spin />}
    // style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    className={classes['loading-component']}
  />
));
