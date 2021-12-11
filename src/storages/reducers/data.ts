import { Reducer } from 'redux';
import TApiReducerData from '../../types/TApiReducer';
import IFetchError from '../../types/IFetchError';
import TReduxData from '../../types/TReduxData';
import showNotification from '../../utils/showNotification';

const initialState: TReduxData = {
  isLoading: false,
  data: null,
  isError: false,
};

const dataReducer: Reducer = (state = initialState, action: TApiReducerData) => {
  const { type, payload } = action;
  switch (type) {
    case 'DATA_REQUEST_LOADING':
      return dataReducerLoading();

    case 'DATA_REQUEST_RESPONSE':
      return dataReducerResponse(payload);

    case 'DATA_REQUEST_ERROR':
      return dataReducerError(payload);
      
    default:
      return {...state};
  }
};

const dataReducerLoading: () => TReduxData = () => {
  return {
    isLoading: true,
    isError: false,
    data: null
  }
};

const dataReducerError: (error: IFetchError) => TReduxData = (error) => {
  showNotification({
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

const dataReducerResponse: (sourceData: any) => TReduxData = (sourceData) => {
  return {
    isLoading: false,
    data: sourceData,
    isError: false
  }
}

export default dataReducer;
