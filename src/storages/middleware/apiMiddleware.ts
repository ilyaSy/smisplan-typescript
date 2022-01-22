import axios from "axios";
import { Middleware } from "redux";

export const defaultHeaders: HeadersInit = {
  "Content-type": "application/json",
};

export const apiMiddleware: Middleware =
  () =>
  (dispatch) =>
  async (action: any) => {
    const { type, method = "GET", url, body, headers = defaultHeaders } = action;
    // console.log(action, type);

    if (!/REQUEST/.test(type)) {
      return dispatch(action);
    }

    dispatch({type: type + '_LOADING'});

    try {
      const response = await axios.request({
        method,
        url,
        data: JSON.stringify(body),
        headers,
      });

      console.log(JSON.stringify(body))

      dispatch({type: type + '_RESPONSE', payload: response.data, method});
    } catch (error) {
      dispatch({type: type + '_ERROR', payload: error});
    }
  }
