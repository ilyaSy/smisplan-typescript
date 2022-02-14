import axios from "axios";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { TDictionary } from "../types/TDictionary";
import { TDictionaryInfo } from "../types/TDictionaryInfo";
import { TObject } from "../types/TObject";

export type TGetDataUrl = { getDataUrl: string };
export type TMetadataDictionary = Record<string, TDictionaryInfo>[] | TGetDataUrl;

interface IDictionaryContext {
  dictionary: TDictionary;
  setDictionary: (parameter: string, parameterDictionary: TMetadataDictionary) => void;
};

const mapDictionaryArrayToObject = (array: Record<string, TDictionaryInfo>[]): TObject<TDictionaryInfo> => {
  return Object.fromEntries(
    array.map((value) => [value.value, {
      text: value.text,
      value: value.value,
      tag: value?.tag
    }])
    // array.map((value) => [value.value, value.text])
  )
}

const DictionaryContext = React.createContext<IDictionaryContext>({} as IDictionaryContext);

const useDictionaryContext = () => {
  const context = useContext(DictionaryContext);
  return context;
}

export const DictionaryContextProvider: React.FC = ({children}) => {
  const [dict, setDict] = useState<IDictionaryContext["dictionary"]>({});

  const dictionary = useMemo(() => dict, [dict]);

  const setDictionary = useCallback((
    parameter: string,
    parameterDictionary: TMetadataDictionary
  ) => {
    if ((parameterDictionary as TGetDataUrl).getDataUrl) {
      const url = (parameterDictionary as TGetDataUrl).getDataUrl;

      axios.get(url)
        .then((response) => {
          setDict((prev) => {
            return {
              ...prev,
              [parameter]: mapDictionaryArrayToObject(response.data as Record<string, TDictionaryInfo>[])
            }
          });
        })
        .catch(console.log)
    } else {
      setDict((prev) => {
        return {
          ...prev,
          [parameter]: mapDictionaryArrayToObject(parameterDictionary as Record<string, TDictionaryInfo>[])
        }
      });
    }
  }, []);

  return (
    <DictionaryContext.Provider value={{
      dictionary,
      setDictionary
    }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export default useDictionaryContext;
