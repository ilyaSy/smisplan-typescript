import TApiAction from "../../types/TApiAction";
import TApiActionBody from "../../types/TApiActionBody";

const METADATA_GET_ACTION: (body: TApiActionBody) => TApiAction  = () => {
  return {
    type: "METADATA_REQUEST",
    url: "",
    method: "GET",
  }
}

export default METADATA_GET_ACTION;