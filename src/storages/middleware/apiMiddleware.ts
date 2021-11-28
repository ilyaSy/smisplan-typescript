import axios from "axios";
import { Dispatch } from "redux";
import TApiAction from "../../types/TApiAction";

const defaultHeaders: HeadersInit = {
  "Content-type": "application/json",
};

export const apiMiddleware = (action: TApiAction) => {
  const { type, method = "GET", url, body, headers = defaultHeaders } = action;

  if (!/REQUEST/.test(type)) {
    return (dispatch: Dispatch) => dispatch(action);
  }

  return async (dispatch: Dispatch) => {
    dispatch({type: type + '_LOADING'});

    try {
      const response = await axios.request({
        method,
        url,
        data: JSON.stringify(body),
        headers,
      });

      dispatch({type: type + '_RESPONSE', payload: response.data});
    } catch (error) {
      dispatch({type: type + '_ERROR', payload: error});
    }
  }
}