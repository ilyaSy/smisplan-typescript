import { urlApi } from "../../constants/constants"
import TApiAction from "../../types/TApiAction"
import TApiActionBody from "../../types/TApiActionBody"

const type = 'DATA_REQUEST';

export const dataGetAction: (tablename: string) => TApiAction = (tablename) => {
  return {
    type,
    url: `${urlApi}/${tablename}/`,
    method: "GET"
  }
}

export const dataDeleteAction: 
  (tablename: string, body: TApiActionBody) => TApiAction = 
  (tablename, body) => {
    return {
      type,
      url: `${urlApi}/${tablename}/`,
      method: "DELETE",
      body,
    }
}

export const dataAddAction: 
  (tablename: string, body: TApiActionBody) => TApiAction = 
  (tablename, body) => {
    return {
      type,
      url: `${urlApi}/${tablename}/`,
      method: "POST",
      body,
    }
}

export const dataUpdateAction: (tablename: string, body: TApiActionBody) => TApiAction = (tablename, body) => {
  return {
    type,
    url: `${urlApi}/${tablename}/`,
    method: "PATCH",
    body,
  }
}