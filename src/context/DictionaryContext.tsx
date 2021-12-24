import axios from "axios";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { TDictionary } from "../types/TDictionary";

type TGetDataUrl = { getDataUrl: string };
type TMetadataDictionary = Record<string, string>[] | TGetDataUrl;

interface IDictionaryContext {
  dictionary: TDictionary;
  setDictionary: (parameter: string, parameterDictionary: TMetadataDictionary) => void;
};

const mapDictionaryArrayToObject = (array: Record<string, string>[]): {[k: string]: string} => {
  return Object.fromEntries(
    array.map((value) => [value.value, value.text])
  )
}

const DictionaryContext = React.createContext<IDictionaryContext>({} as IDictionaryContext);

const useDictionaryContext = () => {
  const context = useContext(DictionaryContext);
  return context;
}

export const DictionaryContextProvider: React.FC = ({children}) => {
  const [dict, setDict] = useState<IDictionaryContext["dictionary"]>({});

  const dictionary = useMemo(() => {
    return dict;
  }, [dict]);

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
              [parameter]: mapDictionaryArrayToObject(response.data as Record<string, string>[])
            }
          });
        })
        .catch(console.log)
    } else {
      setDict((prev) => {
        return {
          ...prev, 
          [parameter]: mapDictionaryArrayToObject(parameterDictionary as Record<string, string>[])
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