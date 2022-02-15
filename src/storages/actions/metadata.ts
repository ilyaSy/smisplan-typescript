import { urlApi } from "../../constants/constants";
import { TApiAction } from "../../types/TApiAction";

export const metadataGetAction: (tablename: string) => TApiAction = (tablename) => {
  return {
    type: "METADATA_REQUEST",
    url: `${urlApi}/${tablename}-meta/`,
    method: "GET",
  }
}
