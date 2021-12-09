import { Menu, Dropdown, Tooltip } from 'antd';
import { TData } from '../../types/TData';

const handleMenuClick = (dataItem: TData) => (e: any) => {
  console.log('event', e);
  console.log('data', dataItem);
};

const menu = (dataItem: TData) => {
  return (
    <Menu>
      <Menu.Item key='1' onClick={handleMenuClick(dataItem)}>
        1st item
      </Menu.Item>
      <Menu.Item key='2' onClick={handleMenuClick(dataItem)}>
        2nd item
      </Menu.Item>
      <Menu.Item key='3'>3rd item</Menu.Item>
    </Menu>
  );
};

const DropdownMenu = (dataItem: TData) => {
  return (
    <Tooltip
      placement='topRight'
      title="Меню действий"
    >
      <Dropdown.Button
        overlay={menu(dataItem)}
        trigger={['click']}
      />
    </Tooltip>
  );
};

export default DropdownMenu;
