type TApiAction = {
  type: string,
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  headers?: {
    [key: string]: string,
  },
  body?: any
};

export default TApiAction;