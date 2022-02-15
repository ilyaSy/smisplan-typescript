import { useSelector } from "react-redux";
import { TReduxData } from "../../types/TReduxData";
import metadataReducer from "../reducers/data";

export const useMetadataSelector = () => {
  const metadata: TReduxData = useSelector((state: ReturnType<typeof metadataReducer>) => state.metadataReducer);

  return metadata;
}
