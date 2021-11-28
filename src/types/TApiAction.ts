export type TApiAction = {
  type: string,
  method?: "GET" | "POST" | "DELETE" | "PATCH",
  url: string,
  headers?: {
    [key: string]: string,
  },
  body?: any
};
