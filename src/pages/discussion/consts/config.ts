import { IPage } from 'interfaces';

export const config: IPage = {
  url: '/discussion',
  tableName: 'discussion',
  label: 'Совещания',
  order: 20,

  parameters: {
    defaultSortField: ['date', 'time'],
    defaultSortDirection: ['ascend', 'ascend'],
  },
};
