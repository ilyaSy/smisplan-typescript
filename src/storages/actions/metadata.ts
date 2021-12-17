import { urlApi } from "../../constants/constants";
import TApiAction from "../../types/TApiAction";

const metadataGetAction: (tablename: string) => TApiAction = (tablename) => {
  return {
    type: "METADATA_REQUEST",
    url: `${urlApi}/${tablename}-meta/`,
    method: "GET",
  }
}

export default metadataGetAction;