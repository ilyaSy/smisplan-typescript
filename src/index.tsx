import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { StorageProvider } from './storages/storage';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
import { DictionaryContextProvider } from './context/DictionaryContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <UserContextProvider>
        <DictionaryContextProvider>
          <StorageProvider>
            <App />
          </StorageProvider>
        </DictionaryContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
