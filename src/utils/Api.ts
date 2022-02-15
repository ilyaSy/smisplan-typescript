import axios from "axios";
import { tuple } from "antd/lib/_util/type"
import { IFetchError } from "../types/IFetchError";
import { mainModes, urlApi } from "../constants/constants"
import Notification from "../components/UI/Notification";

const ModesType = tuple(...mainModes);

export class Api {
  public static async getConnectedData (tablename: typeof ModesType[number], connectedTablename: typeof ModesType[number], id: string | number) {
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
