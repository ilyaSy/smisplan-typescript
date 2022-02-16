import { TData } from "../../../../types/TData"
import moment from "moment";
import 'moment/locale/ru';

moment.locale('ru');

type TGetTableWithPseudoFields = (
  sourceData: TData[],
  columns: TData[],
) => TData[];

export const getTableWithPseudoFields: TGetTableWithPseudoFields = (
  sourceData,
  columns,
) => {
  return sourceData.map((data) => {
    const dataInfo = {...data}
    columns.forEach((column) => {
      if (column.isPseudo) {
        try {
          if (column.pseudoFieldFormula === 'prettyDate') {
            dataInfo[column.id] = moment(new Date(dataInfo.date)).format('dddd, DD MMMM');
          } else {
            // eval("dataInfo[column.id] = moment(new Date(dataInfo.date + ' ' + dataInfo.time)).format('dddd, DD MMMM')");
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
    return dataInfo;
  });
}
