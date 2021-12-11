import { urlApi } from "../../constants/constants";
import TApiAction from "../../types/TApiAction";

const metadataGetAction: () => TApiAction  = () => {
  return {
    type: "METADATA_REQUEST",
    url: `${urlApi}/task-meta/`,
    method: "GET",
  }
}

export default metadataGetAction;