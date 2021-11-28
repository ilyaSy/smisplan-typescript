import React, { useEffect } from "react";
import { Typography } from "antd";
import useNotificationContext from "./context/NotificationContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const { Title } = Typography;

const App: React.FC = () => {
  const { showNotification } = useNotificationContext();
  
  useEffect(() => {
    showNotification({
      type: "info",
      message: "Тестирование использования оповещений",
      description: "Оповещения запихнуты в контекст"
    });
  
    showNotification({
      type: "success",
      message: "Тестирование использования оповещений",
      description: "Оповещения запихнуты в контекст"
    });
  }, [showNotification]);

  return (
    <>
      <Header />
      <Main />
      <Title level={5}>Hello world!</Title>
    </>    
  );
}

export default App;
