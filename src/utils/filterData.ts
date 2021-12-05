import { TData } from "../types/TData";

const filterData = (key: string) => (value: any, record: TData) => record[key] === value;

export default filterData;