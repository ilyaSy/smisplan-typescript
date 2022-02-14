import React, { useState } from "react";
import TUser from "../types/TUser";

interface IUserContextProvider {
  user: TUser | undefined;
  setUser: (user: TUser) => void;
}

export const UserContext = React.createContext<IUserContextProvider>({} as IUserContextProvider);

export const UserContextProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<TUser>({
    email: "puhskin@yandex.ru",
    name: "Пушкин",
    login: "pushkin"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
