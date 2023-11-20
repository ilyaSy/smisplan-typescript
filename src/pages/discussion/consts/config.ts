import { IPage } from 'interfaces';

export const config: IPage = {
  url: '/discussion',
  tableName: 'discussion',
  label: 'Совещания',
  order: 20,

  parameters: {
    defaultSortField: ['week', 'date', 'time'],
    defaultSortDirection: ['descend', 'ascend', 'ascend'],
  },
};
