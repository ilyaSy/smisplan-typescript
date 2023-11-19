import { createSlice } from '@reduxjs/toolkit';

import { TApiReducerData, TReduxData } from 'interfaces';
import Notification from 'components/UI/Notification';

const initialState: TReduxData = {
  isLoading: false,
  data: null,
  isError: false,
};

const metadata = createSlice({
  name: 'METADATA',
  initialState,
  reducers: {
    REQUEST_LOADING: () => ({
      isLoading: true,
      isError: false,
      data: null,
    }),

    REQUEST_RESPONSE: (state, { payload }: TApiReducerData) => ({
      isLoading: false,
      isError: false,
      data: payload,
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

export const metadataReducer = metadata.reducer;
