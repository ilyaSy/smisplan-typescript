import { THtmlMethod } from "./THtmlMethod";

export type TApiAction = {
  type: string,
  method?: THtmlMethod,
  url: string,
  headers?: {
    [key: string]: string,
  },
  body?: any
};
