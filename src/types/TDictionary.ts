import { TDictionaryInfo } from "./TDictionaryInfo";
import { TObject } from "./TObject";

export type TDictionary = {
  [k: string]: TObject<TDictionaryInfo>
}
