import { useSelector } from "react-redux";
import { TReduxData } from "../../types/TReduxData";
import dataReducer from "../reducers/data";

export const useDataSelector = () => {
  const data: TReduxData = useSelector((state: ReturnType<typeof dataReducer>) => state.dataReducer);

  return data;
}
