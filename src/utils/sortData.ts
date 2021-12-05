import { TData } from "../types/TData";

const sortData = (key: string) => (a: TData, b: TData) => {
  if (a[key] < b[key]) return 1;
  if (a[key] > b[key]) return -1;
  return 0;
}

export default sortData;