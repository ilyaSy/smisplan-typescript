import React, { useEffect } from "react";
import { Typography } from "antd";
import { useNotificationContext } from "./context/NotificationContext";

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
    <Title level={2}> 
      Hello world!
    </Title>
  );
}

export default App;
