import { Reducer } from 'redux';
import { TApiReducerData } from '../../types/TApiReducer';
import { IFetchError } from '../../types/IFetchError';
import { TReduxData } from '../../types/TReduxData';
import Notification from '../../components/UI/Notification';

const initialState: TReduxData = {
  isLoading: false,
  data: null,
  isError: false,
};

const metadataReducer: Reducer = (state = initialState, action: TApiReducerData) => {
  const { type, payload } = action;
  switch (type) {
    case 'METADATA_REQUEST_LOADING':
      return metadataReducerLoading();;

    case 'METADATA_REQUEST_RESPONSE':
      return metadataReducerResponse(payload);

    case 'METADATA_REQUEST_ERROR':
      return metadataReducerError(payload);;

    default:
      return {...state};
  }
};

const metadataReducerLoading: () => TReduxData = () => {
  return {
    isLoading: true,
    isError: false,
    data: null
  }
};

const metadataReducerError: (error: IFetchError) => TReduxData = (error) => {
  Notification({
    type: 'error',
    message: 'Ошибка при загрузке данных',
    description: error.message ? error.message : error.statusText,
  });

  return {
    isLoading: false,
    isError: true,
    data: null
  }
};

const metadataReducerResponse: (sourceData: any) => TReduxData = (sourceData) => {
  return {
    isLoading: false,
    data: sourceData,
    isError: false
  }
}

export default metadataReducer;
