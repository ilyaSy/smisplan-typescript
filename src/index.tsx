import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { StorageProvider } from './storages/storage';
import { DictionaryContextProvider } from './context/DictionaryContext';
import { PrintPDFContextProvider } from './context/PrintPDFContext';
import App from './App';
import './index.css';
import 'antd/dist/antd.min.css';

const basename: string = document.location.hostname === 'ilyasy.github.io'
  ? '/smisplan-typescript/'
  : '/';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <UserContextProvider>
        <DictionaryContextProvider>
          <StorageProvider>
            <PrintPDFContextProvider>
              <App />
            </PrintPDFContextProvider>
          </StorageProvider>
        </DictionaryContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
