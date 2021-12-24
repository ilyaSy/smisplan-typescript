import { TData } from "../types/TData";

const sortData = (key: string, direction: "asc" | "desc" = "asc") => (a: TData, b: TData) => {
  if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
  if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
  return 0;
}

export default sortData;