import React from 'react';
import ReactDOM from 'react-dom';
import { UserContextProvider } from './context/UserContext';
import { NotificationContextProvider } from './context/NotificationContext';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
