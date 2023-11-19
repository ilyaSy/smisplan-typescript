import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { mapValues } from 'lodash';

import { TData } from 'interfaces';
import { useDictionaryContext } from 'context';
import { useMetadataSelector, useDataSelector } from 'storages/selectors';
import { metadataGetAction } from 'storages/actions/metadata';
import { dataGetAction } from 'storages/actions/data';

export const useGetDataMeta = (tablename: string) => {
  const [ data, setData ] = useState<TData[]>([]);
  const { dictionary, setDictionary } = useDictionaryContext();

  const { data: sourceData, isError: isErrorData, isLoading: isLoadingData } = useDataSelector();
  const { data: metadata, isError: isErrorMetadata, isLoading: isLoadingMetadata } = useMetadataSelector();

  const dispatch = useDispatch();

  const mapDictionaryCb = useCallback((value: string, key: string) => {
    const metadataProperty = metadata?.find((property) => property.id === key);

    if (metadataProperty && dictionary[key]) {
      if (metadataProperty.type === 'multi-select') {
        return value.split(',').map((v) => dictionary[key][v].text).join(', ');
      } else if (['select', 'checkbox'].includes(metadataProperty.type) && dictionary[key][value]) {
        return dictionary[key][value].text;
      }
    }

    return value;
  }, [metadata, dictionary]);

  useEffect(() => {
    dispatch(dataGetAction(tablename));
    dispatch(metadataGetAction(tablename));
  }, [tablename, dispatch]);

  useEffect(() => {
    if (metadata) {
      metadata
        .filter((property) => ['select', 'multi-select', 'checkbox'].includes(property.type))
        .forEach((property) => setDictionary(property.id, property.validValues));
    }
  }, [metadata, setDictionary]);

  useEffect(() => {
    if (sourceData && metadata && Object.keys(dictionary).length) {
      setData(() => sourceData.map((d) => mapValues(d, mapDictionaryCb)));
    }
  }, [sourceData, metadata, dictionary, mapDictionaryCb]);

  return {
    data, isErrorData, isLoadingData,
    metadata, isErrorMetadata, isLoadingMetadata,
  };
};
