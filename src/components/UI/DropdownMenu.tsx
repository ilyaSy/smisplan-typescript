import { Menu, Dropdown, Tooltip } from 'antd';
import { 
  // DeleteOutlined,
  // FormOutlined,
  BellOutlined,
  DeleteFilled,
  EditFilled
} from '@ant-design/icons';
import { TData } from '../../types/TData';

type TDropdownMenu = {
  dataItem: TData,
  title: string,
}

const handleMenuClick = (dataItem: TData) => (e: any) => {
  console.log('event', e);
  console.log('data', dataItem);
};

const menu = (dataItem: TData) => {
  return (
    <Menu>
      <Menu.Item
        key={`action-menu-${dataItem.key}-edit`}
        onClick={handleMenuClick(dataItem)}
        icon={<EditFilled />}
      >
        Редактировать
      </Menu.Item>
      <Menu.Item
        key={`action-menu-${dataItem.key}-delete`}
        onClick={handleMenuClick(dataItem)}
        icon={<DeleteFilled />}
      >
        Удалить
      </Menu.Item>
      <Menu.SubMenu
        key={`action-menu-${dataItem.key}-change-status`}
        title="Изменить статус"
      >
        <Menu.Item
          key={`action-menu-${dataItem.key}-status1`}
          onClick={handleMenuClick(dataItem)}
        >
          Статус 1
        </Menu.Item>
        <Menu.Item
          key={`action-menu-${dataItem.key}-status2`}
          onClick={handleMenuClick(dataItem)}
        >
          Статус 2
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        key={`action-menu-${dataItem.key}-notification`}
        icon={<BellOutlined />}
      >
        Оповестить
      </Menu.Item>
    </Menu>
  );
};

const DropdownMenu: React.FC<TDropdownMenu> = ({dataItem, title}) => {
  return (
    <Tooltip
      placement='topRight'
      title={title}
    >
      <Dropdown.Button
        overlay={menu(dataItem)}
        trigger={['click']}
      />
    </Tooltip>
  );
};

export default DropdownMenu;
