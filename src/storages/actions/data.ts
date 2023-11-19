import { TApiAction, TActionBody } from 'types';
import { urlApi } from 'consts';

const type = 'DATA/REQUEST';

export const dataGetAction: (tablename: string) => TApiAction = (tablename) => ({
  type,
  url: `${urlApi}/${tablename}/`,
  method: 'GET',
});

export const dataDeleteAction: (tablename: string, body: TActionBody) => TApiAction =
  (tablename, body) => ({
    type,
    url: `${urlApi}/${tablename}/`,
    method: 'DELETE',
    body,
  });

export const dataAddAction: (tablename: string, body: TActionBody) => TApiAction =
  (tablename, body) => ({
    type,
    url: `${urlApi}/${tablename}/`,
    method: 'PUT',
    body,
  });

export const dataUpdateAction: (tablename: string, body: TActionBody) => TApiAction =
  (tablename, body) => ({
    type,
    url: `${urlApi}/${tablename}/`,
    method: 'PATCH',
    body,
  });
