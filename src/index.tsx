import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import { setMockAdapter } from './utils';
import { StorageProvider } from 'storages/storage';
import { UserContextProvider, DictionaryContextProvider, PrintPDFContextProvider } from './context';
import App from './App';

import './index.css';
import 'antd/dist/antd.min.css';

moment.locale('ru');

setMockAdapter();

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
  document.getElementById('root'),
);
