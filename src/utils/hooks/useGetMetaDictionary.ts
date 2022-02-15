import { useEffect, useState } from "react";
import axios from "axios";
import { modes } from "../../constants/constants"
import { TGetDataUrl, TMetadataDictionary } from "../../context/DictionaryContext";
import { TData } from "../../types/TData";
import { TDictionary } from "../../types/TDictionary";
import { TObject } from "../../types/TObject";
import { TDictionaryInfo } from "../../types/TDictionaryInfo";
import { defaultHeaders } from "../../storages/middleware/apiMiddleware";
import { metadataGetAction } from "../../storages/actions/metadata";

const mapDictionaryArrayToObject = (array: Record<string, TDictionaryInfo>[]): TObject<TDictionaryInfo> => {
  return Object.fromEntries(
    array.map((value) => [value.value, {
      text: value.text,
      value: value.value,
      tag: value?.tag
    }])
  )
}

export const useGetMetaDictionary = (tablename?: typeof modes[number]['id'] ) => {
  const [metadata, setMetadata] = useState<TData[] | null>(null);
  const [dictionary, setDictionary] = useState<TDictionary | null>(null);

  useEffect(() => {
    if (tablename) {
      const metadataAction = metadataGetAction(tablename);

      axios.request({
        method: metadataAction.method,
        url: metadataAction.url,
        headers: defaultHeaders as any,
      })
        .then((metadataResponse: any) => {
          setMetadata(metadataResponse.data);

          metadataResponse.data
            .filter(({ type }: {type: string}) => ['select', 'multi-select'].includes(type))
            .forEach(({ id, validValues }: {id: string, validValues: TMetadataDictionary}) => {
              if ((validValues as TGetDataUrl).getDataUrl) {
                axios.get((validValues as TGetDataUrl).getDataUrl)
                  .then((dictionaryResponse) => {
                    setDictionary((prev) => {
                      return {
                        ...prev,
                        [id]: mapDictionaryArrayToObject(dictionaryResponse.data as Record<string, TDictionaryInfo>[])
                      }
                    });
                  })
                  .catch(console.log)
              } else if (validValues) {
                setDictionary((prev) => {
                  return {
                    ...prev,
                    [id]: mapDictionaryArrayToObject(validValues as Record<string, TDictionaryInfo>[])
                  }
                });
              }
            })
        })
    }
  }, [tablename]);

  return { metadata, dictionary };
}
