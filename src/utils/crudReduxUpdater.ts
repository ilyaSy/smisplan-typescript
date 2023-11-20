import { TReduxData, TData, THtmlMethod } from 'interfaces';

export const crudReduxDataUpdater:
(stateData: TReduxData['data'], data: TData | TData[], method?: THtmlMethod) => TReduxData['data'] =
  (stateData, data, method) => {
    switch (method) {
      case 'POST':
      case 'PUT':
        return stateData && data
          ? [ ...stateData, data]
          : [];

      case 'PATCH':
        return stateData && data
          ? [ ...stateData.map((d) => d.id === (data as TData).id ? data : d) ]
          : [];

      case 'DELETE':
        return stateData && data
          ? stateData.filter(({ id }) => id !== (data as TData).id)
          : [];

      default:
        return data
          ? [...(data as TData[])]
          : [];
    }
  };
