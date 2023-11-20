import { IPage } from 'interfaces';

export const config: IPage = {
  url: '/event',
  tableName: 'event',
  label: 'Изменения',
  order: 40,

  parameters: {
    defaultSortField: 'dt',
    defaultSortDirection: 'descend',
  },
};
