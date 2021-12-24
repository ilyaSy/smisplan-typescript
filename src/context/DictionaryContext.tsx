import axios from "axios";
import React, { useCallback, useContext, useMemo, useState } from "react";

type TGetDataUrl = { getDataUrl: string };
type TDictionary = Record<string, string>[] | TGetDataUrl;

interface IDictionaryContext {
  dictionary: {
    [d: string]: {
      [k: string]: string
    }
  };
  setDictionary: (parameter: string, parameterDictionary: TDictionary) => void;
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
    parameterDictionary: TDictionary
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