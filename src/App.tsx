import React, { useEffect } from "react";
// import showNotification from "./utils/showNotification";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import classes from './App.module.scss';

import setMockAdapter from './utils/apiMockAdapter';
setMockAdapter();

const App: React.FC = () => {
  // useEffect(() => {
  //   showNotification({
  //     type: "info",
  //     message: "Тестирование использования оповещений",
  //     description: "Оповещения запихнуты в контекст"
  //   });
  
  //   showNotification({
  //     type: "success",
  //     message: "Тестирование использования оповещений",
  //     description: "Оповещения запихнуты в контекст"
  //   });
  // }, []);

  return (
    <div className={classes.main}>
      <Header />
      <Content />
    </div>    
  );
}

export default App;
