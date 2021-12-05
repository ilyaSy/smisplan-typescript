import React, { useEffect } from "react";
import { Typography } from "antd";
import showNotification from "./utils/showNotification";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import LoadingComponent from "./components/UI/LoadingComponent";
import classes from './App.module.scss';

const { Title } = Typography;

const App: React.FC = () => {
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
  }, []);

  return (
    <div className={classes.main}>
      <Header />
      <Content />

      {/* <LoadingComponent />

      <Title level={1}>Hello world!</Title> */}
    </div>    
  );
}

export default App;
