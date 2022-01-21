import moment from "moment";
import { invert } from "lodash";
import { TData } from "../types/TData"
import { TDictionary } from "../types/TDictionary"

type TConvertDataItem = (
  dictionary: TDictionary,
  data: TData,
  metadata: TData[],
  mode: 'form' | 'table',
) => TData;

export const convertDataItem: TConvertDataItem = (dictionary, data, metadata, mode) => {
  return Object.fromEntries(metadata
    .filter((m) => m.id !== 'specificParameters')
    .map((m) => {
      const type = m.type;
      const name = mode === 'form' ? m.name : m.id;
      const invertDictionary = invert(dictionary[name]);

      if (mode === 'form') {
        switch (type) {
          case 'date':
            return [name, moment(data[name]).format('YYYY-MM-DD')];

          case 'time':
            return [name, moment(data[name]).format('HH:mm:ss')];

          case 'datetime':
            return [name, moment(data[name]).format('YYYY-MM-DD HH:mm:ss')];

          case 'multi-select':
            return [name, data[name].join(',')];
        }
      } else if (mode === 'table') {
        switch (type) {
          case 'select':
          case 'multi-select':
            return [
              name,
              data[name].split(', ').map((d: string) => invertDictionary[d]).join(',')
            ]
        }
      }
      return [name, data[name]];
    }))
}
