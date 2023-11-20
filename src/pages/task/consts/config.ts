import { IPage } from 'interfaces';

export const config: IPage = {
  url: '/task',
  tableName: 'task',
  label: 'Задачи',
  order: 10,

  parameters: {
    defaultSortField: 'id',
    defaultSortDirection: 'descend',
  },
};
