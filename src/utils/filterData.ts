import { TData, TDictionary } from 'types';

export const filterData =
  (key: string, dictionary: TDictionary) =>
    (value: any, record: TData) =>
      record[key] === (dictionary[key] ? dictionary[key][value].text : value);
