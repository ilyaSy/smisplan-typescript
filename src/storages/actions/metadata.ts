import { TApiAction } from 'interfaces';
import { urlApi } from 'consts';

export const metadataGetAction: (tablename: string) => TApiAction =
  (tablename) => ({
    type: 'METADATA/REQUEST',
    url: `${urlApi}/${tablename}-meta/`,
    method: 'GET',
  });
