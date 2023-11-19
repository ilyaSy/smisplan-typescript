import axios from 'axios';
import { Middleware } from 'redux';

export const defaultHeaders: HeadersInit = {
  'Content-type': 'application/json',
};

export const apiMiddleware: Middleware =
  () =>
    (dispatch) =>
      async (action: any) => {
        const { type, method = 'GET', url, body, headers = defaultHeaders } = action;

        if (type.split('/')[1] !== 'REQUEST') {
          return dispatch(action);
        }

        dispatch({ type: type + '_LOADING' });

        try {
          const response = await axios.request({
            method,
            url,
            data: JSON.stringify(body),
            headers,
          });

          // console.info(JSON.stringify(body));

          dispatch({ type: type + '_RESPONSE', payload: response.data, method });
        } catch (error) {
          dispatch({ type: type + '_ERROR', payload: error });
        }
      };
