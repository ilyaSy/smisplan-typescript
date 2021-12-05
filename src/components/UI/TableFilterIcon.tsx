import { Tooltip } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const TableFilterIcon = (filtered: boolean) => {
  return (
    <Tooltip placement="topLeft" title="Фильтровать">
      <FilterOutlined style={{ fontSize: '17px', color: filtered ? '#1890ff' : undefined }} />
    </Tooltip>
  );
}

export default TableFilterIcon;