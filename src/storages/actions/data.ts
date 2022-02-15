import { urlApi } from "../../constants/constants";
import { TApiAction } from "../../types/TApiAction";
import { TActionBody } from "../../types/TApiActionBody";

const type = 'DATA_REQUEST';

export const dataGetAction: (tablename: string) => TApiAction = (tablename) => {
  return {
    type,
    url: `${urlApi}/${tablename}/`,
    method: "GET"
  }
}

export const dataDeleteAction:
  (tablename: string, body: TActionBody) => TApiAction =
  (tablename, body) => {
    return {
      type,
      url: `${urlApi}/${tablename}/`,
      method: "DELETE",
      body,
    }
}

export const dataAddAction:
  (tablename: string, body: TActionBody) => TApiAction =
  (tablename, body) => {
    return {
      type,
      url: `${urlApi}/${tablename}/`,
      method: "PUT",
      body,
    }
}

export const dataUpdateAction: (tablename: string, body: TActionBody) => TApiAction = (tablename, body) => {
  return {
    type,
    url: `${urlApi}/${tablename}/`,
    method: "PATCH",
    body,
  }
}
