import { TData } from "./TData";

export type TReduxData = {
  isLoading: boolean,
  isError: boolean,
  data: TData[] | null;
};
