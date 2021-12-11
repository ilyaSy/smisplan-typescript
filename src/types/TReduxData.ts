import { TData } from "./TData";

type TReduxData = {
  isLoading: boolean,
  isError: boolean,
  data: TData[] | null;
};

export default TReduxData;
