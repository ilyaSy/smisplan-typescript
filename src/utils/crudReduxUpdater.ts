import {THtmlMethod} from '../types/THtmlMethod';
import TReduxData from "../types/TReduxData";
import { TData } from "../types/TData";

export const crudReduxDataUpdater = (method: THtmlMethod, stateData: TReduxData["data"], data: TData | TData[] | null) => {
  console.log('crudReduxDataUpdater')
  console.log(method, stateData, data);

  switch (method) {
    case "POST":
    case "PUT":
      return stateData && data
        ? [ ...stateData, data]
        : [data]

    case "PATCH":
      return stateData && data
        ? [ stateData.map((d) => d.id === (data as TData).id ? data : d) ]
        : []

    case "DELETE":
      return stateData && data
        ? stateData.filter(({id}) => id !== (data as TData).id)
        : []

    default:
      return [...(data as TData[])];
  }
};
