import { TData } from "../types/TData";
import { TDictionary } from "../types/TDictionary";

const filterData = 
  (key: string, dictionary: TDictionary) => 
  (value: any, record: TData) => 
    record[key] === (dictionary[key][value] || value);

export default filterData;