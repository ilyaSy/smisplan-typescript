import moment from "moment";
import { invert } from "lodash";
import { TData } from "../types/TData"
import { TDictionary } from "../types/TDictionary"
// import { TObject } from "../types/TObject";

type TConvertDataItem = (
  dictionary: TDictionary,
  // invertDictionary: TObject<Record<string, string>>,
  data: TData,
  metadata: TData[],
  mode: 'form' | 'table' | 'modalEdit' | 'modalAdd',
) => TData;

export const convertDataItem: TConvertDataItem = (dictionary, data, metadata, mode) => {
  return Object.fromEntries(metadata
    .filter((m) => m.id !== 'specificParameters')
    .map((m) => {
      const type = m.type;
      const name = mode === 'form' ? m.name : m.id;
      let invertDictionary: Record<string, string> = {};
      if (dictionary[name]) {
        invertDictionary = invert(
          Object.fromEntries(Object.entries(dictionary[name]).map(([key, info]) => [key, info.text]))
        );
      }

      if (data[name]) {
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
                data[name]?.split(', ')?.map((d: string) => invertDictionary[d])?.join(',')
              ]
          }
        } else if (mode === 'modalEdit') {
          switch (type) {
            case 'date':
            case 'datetime':
              return [name, moment(new Date(data[name]))]

            case 'time':
              return [name, moment(new Date('1970-01-01 '+ data[name]))]

            case 'select':
              return [name, invertDictionary[data[name]]]

            case 'multi-select':
              return [
                name,
                data[name].split(/, ?/).map((d: string) => invertDictionary[d])
              ]

            case 'checkbox':
              return [
                name,
                data[name] && data[name].toLowerCase() === 'да'
              ]

            default:
              return [name, data[name]]
          }
        } else if (mode === 'modalAdd') {
          switch (type) {
            case 'date':
            case 'datetime':
            case 'time':
              return [name, moment(new Date())]

            case 'select':
              return [name, data[name]]

            case 'multi-select':
              return [
                name,
                data[name].split(/, ?/)
              ]

            default:
              return [name, data[name]]
          }
        }
      } else {
        return [name, undefined]
      }

      return [name, data[name]];
    }))
}
