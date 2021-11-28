import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { NotificationContextProvider } from './context/NotificationContext';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <NotificationContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </NotificationContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
