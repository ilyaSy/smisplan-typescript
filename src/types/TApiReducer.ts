export type TApiReducerData = {
  type: string,
  payload?: any;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};
