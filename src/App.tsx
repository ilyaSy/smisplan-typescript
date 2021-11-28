import React, { useEffect } from "react";
import { Typography } from "antd";
import useNotificationContext from "./context/NotificationContext";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import LoadingComponent from "./components/UI/LoadingComponent";

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
      <Content />
      <LoadingComponent />
      <Title level={1}>Hello world!</Title>
    </>    
  );
}

export default App;
