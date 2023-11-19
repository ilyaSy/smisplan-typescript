import axios from 'axios';

import { IFetchError } from 'interfaces';
import { mainModes, urlApi } from 'consts';
import Notification from 'components/UI/Notification';

type ModesType = (typeof mainModes)[number];

export class Api {
  public static async getConnectedData(tablename: ModesType, connectedTablename: ModesType, id: string | number) {
    try {
      const result = await axios.get(`${urlApi}/${tablename}/get-${connectedTablename}/${id}`);

      return result.data;
    } catch (error) {
      Notification({
        type: 'error',
        message: 'Ошибка при загрузке данных',
        description: (error as IFetchError).message
          ? (error as IFetchError).message
          : (error as IFetchError).statusText,
      });
    }
  }
}
