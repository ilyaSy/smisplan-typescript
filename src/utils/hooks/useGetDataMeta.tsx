import { useCallback, useEffect, useState } from "react";
import { mapValues } from "lodash";
import { useDispatch } from "react-redux";
import { useDataSelector } from "../../storages/selectors/data";
import { useMetadataSelector } from "../../storages/selectors/metadata";
import { dataGetAction } from "../../storages/actions/data";
import { metadataGetAction } from "../../storages/actions/metadata";
import { useDictionaryContext } from "../../context/DictionaryContext";
import { TData } from "../../types/TData";

export const useGetDataMeta = (tablename: string) => {
  const [ data, setData ] = useState<TData[]>([]);
  const { dictionary, setDictionary } = useDictionaryContext();

  const { data: sourceData, isError: isErrorData, isLoading: isLoadingData } = useDataSelector();
  const { data: metadata, isError: isErrorMetadata, isLoading: isLoadingMetadata } = useMetadataSelector();

  const dispatch = useDispatch();

  const mapDictionaryCb = useCallback((value: string, key: string) => {
    const metadataProperty = metadata?.find((property) => property.id === key);
    if (metadataProperty && metadataProperty.type === 'multi-select' && dictionary[key]){
      return value.split(',').map((v) => dictionary[key][v].text).join(', ')
    } else if (metadataProperty && ['select', 'checkbox'].includes(metadataProperty.type)  && dictionary[key] && dictionary[key][value]) {
      return dictionary[key][value].text
    }
    return value;
  }, [metadata, dictionary])

  useEffect(() => {
    dispatch(dataGetAction(tablename));
    dispatch(metadataGetAction(tablename));
  }, [tablename, dispatch]);

  useEffect(() => {
    if (metadata) {
      metadata
        .filter((property) => ['select', 'multi-select', 'checkbox'].includes(property.type))
        .forEach((property) => setDictionary(property.id, property.validValues))
    }
  }, [metadata, setDictionary]);

  useEffect(() => {
    if (sourceData && metadata && Object.keys(dictionary).length) {
      setData(() => sourceData.map((d) => mapValues(d, mapDictionaryCb)));
    }
  }, [sourceData, metadata, dictionary, mapDictionaryCb]);

  return {
    data, isErrorData, isLoadingData,
    metadata, isErrorMetadata, isLoadingMetadata
  }
}
