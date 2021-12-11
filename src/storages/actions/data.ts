import { urlApi } from "../../constants/constants"
import TApiAction from "../../types/TApiAction"
import TApiActionBody from "../../types/TApiActionBody"

const url = `${urlApi}/task/`;
const type = 'DATA_REQUEST';

export const dataGetAction: () => TApiAction = () => {
  return {
    type,
    url,
    method: "GET"
  }
}

export const dataDeleteAction: (body: TApiActionBody) => TApiAction = (body) => {
  return {
    type,
    url,
    method: "DELETE",
    body,
  }
}

export const dataAddAction: (body: TApiActionBody) => TApiAction = (body) => {
  return {
    type,
    url,
    method: "POST",
    body,
  }
}

export const dataUpdateAction: (body: TApiActionBody) => TApiAction = (body) => {
  return {
    type,
    url: "",
    method: "PATCH",
    body,
  }
}