import TApiAction from "../../types/TApiAction"
import TApiActionBody from "../../types/TApiActionBody"

export const DATA_GET_ACTION: () => TApiAction = () => {
  // const {  }
  return {
    type: "DATA_REQUEST",
    url: "",
    method: "GET"
  }
}

export const DATA_DELETE_ACTION: (body: TApiActionBody) => TApiAction = () => {
  return {
    type: "DATA_REQUEST",
    url: "",
    method: "DELETE",
  }
}

export const DATA_ADD_ACTION: (body: TApiActionBody) => TApiAction = () => {
  return {
    type: "DATA_REQUEST",
    url: "",
    method: "POST"
  }
}

export const DATA_UPDATE_ACTION: (body: TApiActionBody) => TApiAction = () => {
  return {
    type: "DATA_REQUEST",
    url: "",
    method: "PATCH"
  }
}