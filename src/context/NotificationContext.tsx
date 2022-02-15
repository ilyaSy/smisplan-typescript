import React, { useCallback, useContext } from "react";
import { notification } from 'antd';
import { INotification } from "../types/INotification"

interface INotificationProvider {
  showNotification: (action: INotification) => void;
}

const NotificationContext = React.createContext<INotificationProvider>({} as INotificationProvider);

const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  return context;
}

export const NotificationContextProvider: React.FC = ({children}) => {
  const showNotification = useCallback((action: INotification) => {
    const { type, message, description, duration = 5 } = action;
    notification[type]({
      message: message,
      description: description,
      placement: 'topRight',
      duration: duration
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default useNotificationContext;
