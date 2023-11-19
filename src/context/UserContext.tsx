import { createContext, useState } from 'react';

import { TUser } from 'interfaces';

interface IUserContextProvider {
  user: TUser | undefined;
  setUser: (user: TUser) => void;
  logout: VoidFunction;
}

export const UserContext = createContext<IUserContextProvider>({} as IUserContextProvider);

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<TUser | undefined>({
    email: 'puhskin@yandex.ru',
    name: 'Пушкин',
    login: 'pushkin',
  });

  const logout = () => setUser(undefined);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
