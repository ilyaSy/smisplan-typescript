import { TData } from "../types/TData";

const sortData = (key: string) => (a: TData, b: TData) => a[key] - b[key];

export default sortData;