import React from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import classes from './App.module.scss';

import setMockAdapter from './utils/apiMockAdapter';
setMockAdapter();

const App: React.FC = () => {
  return (
    <div className={classes.main}>
      <Header />
      <Content />
    </div>
  );
}

export default App;
