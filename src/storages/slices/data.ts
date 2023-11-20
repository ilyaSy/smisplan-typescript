
import { createSlice } from '@reduxjs/toolkit';

import { TApiReducerData, TReduxData, THtmlMethod } from 'interfaces';
import { crudReduxDataUpdater } from 'utils';
import Notification from 'components/UI/Notification';

const initialState: TReduxData = {
  isLoading: false,
  data: null,
  isError: false,
};

export const data = createSlice({
  name: 'DATA',
  initialState,
  reducers: {
    REQUEST_LOADING: () => ({
      isLoading: true,
      isError: false,
      // data: state.data,
      data: null,
    }),

    REQUEST_RESPONSE: (state, { payload, method }: TApiReducerData) => ({
      isLoading: false,
      data: crudReduxDataUpdater(state.data, payload, method as THtmlMethod),
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
