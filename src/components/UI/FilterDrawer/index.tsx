import { useCallback, useMemo, useState } from "react"
import { Button, Drawer, Tooltip } from "antd";
import { FilterOutlined, FilterFilled } from '@ant-design/icons';
import classes from './FilterDrawer.module.scss';
import { PanelRender } from "rc-table/lib/interface";

type TUseFilterDrawer = () => [PanelRender<{key: string, action: JSX.Element}>, JSX.Element];

export const useFilterDrawer: TUseFilterDrawer = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const openFilter = useCallback((e: any) => {
    setVisible(true);
  }, []);

  const closeFilter = useCallback(() => {
    setVisible(false);
  }, []);

  const ShowButton = useCallback(() => (
    <Tooltip
      placement='topRight'
      title='Показать фильтры'
    >
      <Button
        onClick={openFilter}
        className={classes['filter-button']}
      >
        <FilterOutlined style={{ fontSize: '20px' }}/>
      </Button>
    </Tooltip>
  ), []);

  const Filter = useMemo(() => (
    <Drawer
      title='Фильтры'
      placement="right"
      onClose={closeFilter}
      visible={visible}
    >

    </Drawer>
  ), [
    visible,
    closeFilter
  ]);

  return [ShowButton, Filter];
}
