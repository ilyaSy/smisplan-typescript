import { Reducer } from 'redux';
import TApiReducerData from '../../types/TApiReducer';
import IFetchError from '../../types/IFetchError';
import TReduxData from '../../types/TReduxData';
import showNotification from '../../utils/showNotification';
import { crudReduxDataUpdater } from "../../utils/crudReduxUpdater";
import { THtmlMethod } from "../../types/THtmlMethod";

const initialState: TReduxData = {
  isLoading: false,
  data: null,
  isError: false,
};

const dataReducer: Reducer = (state = initialState, action: TApiReducerData) => {
  const { type, payload, method } = action;
  switch (type) {
    case 'DATA_REQUEST_LOADING':
      return dataReducerLoading(state);

    case 'DATA_REQUEST_RESPONSE':
      const result = crudReduxDataUpdater(method as THtmlMethod, state.data, payload);
      // const resultData = crudReduxDataUpdater(method as THtmlMethod, state, result.data);

      console.log('RESULT');
      console.log(result);

      return dataReducerResponse(result);

    case 'DATA_REQUEST_ERROR':
      return dataReducerError(payload);
      
    default:
      return {...state};
  }
};

const dataReducerLoading: (state: TReduxData) => TReduxData = (state) => {
  return {
    isLoading: true,
    isError: false,
    data: state.data ? [...state.data] : null,
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

const dataReducerResponse: (payload: any) => TReduxData = (payload) => {
  return {
    isLoading: false,
    data: payload,
    isError: false
  }
}

export default dataReducer;
