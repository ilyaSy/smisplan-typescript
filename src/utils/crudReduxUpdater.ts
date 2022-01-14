import {THtmlMethod} from '../types/THtmlMethod';
import TReduxData from "../types/TReduxData";
import { TData } from "../types/TData";

export const crudReduxDataUpdater:
  (method: THtmlMethod, stateData: TReduxData["data"], data: TData | TData[] | null) => TReduxData["data"] =
  (method, stateData, data) => {
    console.log(data);
    console.log(stateData);
    console.log(method);

    switch (method) {
      case "POST":
      case "PUT":
        return stateData && data
          ? [ ...stateData, data]
          : []

      case "PATCH":
        return stateData && data
          ? [ ...stateData.map((d) => d.id === (data as TData).id ? data : d) ]
          : []

      case "DELETE":
        return stateData && data
          ? stateData.filter(({id}) => id !== (data as TData).id)
          : []

      default:
        return data
          ? [...(data as TData[])]
          : []
    }
  };
