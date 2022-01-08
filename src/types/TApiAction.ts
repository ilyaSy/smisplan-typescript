import { THtmlMethod } from "./THtmlMethod";

type TApiAction = {
  type: string,
  method?: THtmlMethod,
  url: string,
  headers?: {
    [key: string]: string,
  },
  body?: any
};

export default TApiAction;