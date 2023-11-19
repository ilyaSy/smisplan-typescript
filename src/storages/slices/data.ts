
import { createSlice } from '@reduxjs/toolkit';

import { TApiReducerData, TReduxData, THtmlMethod } from 'interfaces';
import { crudReduxDataUpdater } from 'utils';
import Notification from 'components/UI/Notification';

const initialState: TReduxData = {
  isLoading: false,
  data: null,
  isError: false,
};

const data = createSlice({
  name: 'DATA',
  initialState,
  reducers: {
    REQUEST_LOADING: (state) => ({
      isLoading: true,
      isError: false,
      data: state.data, // data: null,
    }),

    REQUEST_RESPONSE: (state, { payload, method }: TApiReducerData) => ({
      isLoading: false,
      data: crudReduxDataUpdater(method as THtmlMethod, state.data, payload),
      isError: false,
    }),

    REQUEST_ERROR: (state, { payload }: TApiReducerData) => {
      Notification({
        type: 'error',
        message: 'Ошибка при загрузке данных',
        description: payload.message ? payload.message : payload.statusText,
      });

      return {
        isLoading: false,
        isError: true,
        data: state.data,
      };
    },
  },
});

export const dataReducer = data.reducer;
