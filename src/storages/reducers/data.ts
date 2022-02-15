import { Reducer } from 'redux';
import { TApiReducerData } from '../../types/TApiReducer';
import { IFetchError } from '../../types/IFetchError';
import { TReduxData } from '../../types/TReduxData';
import { THtmlMethod } from "../../types/THtmlMethod";
import { crudReduxDataUpdater } from "../../utils/crudReduxUpdater";
import Notification from '../../components/UI/Notification';

const initialState: TReduxData = {
  isLoading: false,
  data: null,
  isError: false,
};

const dataReducer: Reducer = (state = initialState, action: TApiReducerData) => {
  const { type, payload, method } = action;

  console.log({ type, payload, method })

  switch (type) {
    case 'DATA_REQUEST_LOADING':
      return dataReducerLoading(state);

    case 'DATA_REQUEST_RESPONSE':
      return dataReducerResponse(method as THtmlMethod, state, payload);

    case 'DATA_REQUEST_ERROR':
      return dataReducerError(state, payload);

    default:
      return {...state};
  }
};

const dataReducerLoading: (state: TReduxData) => TReduxData = (state) => {
  return {
    isLoading: true,
    isError: false,
    data: state.data,
    // data: null,
  }
};

const dataReducerError:
  (state: TReduxData, error: IFetchError) => TReduxData =
  (state, error) => {
    Notification({
    type: 'error',
    message: 'Ошибка при загрузке данных',
    description: error.message ? error.message : error.statusText,
  });

  return {
    isLoading: false,
    isError: true,
    data: state.data,
  }
};

const dataReducerResponse:
  (method: THtmlMethod, state: TReduxData, payload: any) => TReduxData =
  (method, state, payload) => {
  return {
    isLoading: false,
    data: crudReduxDataUpdater(method, state.data, payload),
    isError: false
  }
}

export default dataReducer;
