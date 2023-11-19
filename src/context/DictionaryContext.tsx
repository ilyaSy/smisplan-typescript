import React, { useCallback, useContext, useMemo, useState } from 'react';
import axios from 'axios';

import { TDictionary, TDictionaryInfo, TObject } from 'types';

export type TGetDataUrl = { getDataUrl: string };
export type TMetadataDictionary = Record<string, TDictionaryInfo>[] | TGetDataUrl;

interface IDictionaryContext {
  dictionary: TDictionary;
  invertDictionary: TObject<Record<string, string>>;
  setDictionary: (parameter: string, parameterDictionary: TMetadataDictionary) => void;
}

const mapDictionaryArrayToObject = (array: Record<string, TDictionaryInfo>[]): TObject<TDictionaryInfo> =>
  Object.fromEntries(
    array.map((value) => [value.value, {
      text: value.text,
      value: value.value,
      tag: value?.tag,
    }]),
  );

const DictionaryContext = React.createContext<IDictionaryContext>({} as IDictionaryContext);

export const useDictionaryContext = () => {
  const context = useContext(DictionaryContext);

  return context;
};

export const DictionaryContextProvider: React.FC = ({ children }) => {
  const [dict, setDict] = useState<IDictionaryContext['dictionary']>({});

  const dictionary = useMemo(() => dict, [dict]);
  const invertDictionary = useMemo(() => Object.fromEntries(
    Object.entries(dict).map(([property, info]) => {
      const inverseInfo = Object.fromEntries(Object.entries(info).map(([k, v]) => [v.text, k]));

      return [property, inverseInfo];
    }),
  ), [dict]);

  const setDictionary = useCallback((
    parameter: string,
    parameterDictionary: TMetadataDictionary,
  ) => {
    if ((parameterDictionary as TGetDataUrl).getDataUrl) {
      const url = (parameterDictionary as TGetDataUrl).getDataUrl;

      axios.get(url)
        .then((response) => {
          setDict((prev) => ({
            ...prev,
            [parameter]: mapDictionaryArrayToObject(response.data as Record<string, TDictionaryInfo>[]),
          }));
        })
        .catch(console.info);
    } else {
      setDict((prev) => ({
        ...prev,
        [parameter]: mapDictionaryArrayToObject(parameterDictionary as Record<string, TDictionaryInfo>[]),
      }));
    }
  }, []);

  return (
    <DictionaryContext.Provider value={{
      dictionary,
      invertDictionary,
      setDictionary,
    }}>
      {children}
    </DictionaryContext.Provider>
  );
};
