import moment from 'moment';
import 'moment/locale/ru';

import { TData } from 'interfaces';

moment.locale('ru');

type TGetTableWithPseudoFields = (
  sourceData: TData[],
  columns: TData[],
) => TData[];

export const getTableWithPseudoFields: TGetTableWithPseudoFields = (
  sourceData,
  columns,
) => sourceData.map((data) => {
  const dataInfo = { ...data };

  columns.forEach((column) => {
    if (column.isPseudo) {
      try {
        if (column.pseudoFieldFormula === 'prettyDate') {
          dataInfo[column.id] = moment(new Date(dataInfo.date)).format('dddd, DD MMMM');
        }
      } catch (error) {
        console.info(error);
      }
    }
  });

  return dataInfo;
});
