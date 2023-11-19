import { StateFromReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { apiMiddleware } from './middleware/apiMiddleware';
import { dataReducer } from './slices/data';
import { metadataReducer } from './slices/metadata';

const reducer = { metadataReducer, dataReducer };

const store = configureStore({ reducer, middleware: [thunk, apiMiddleware] });

export type TRootState = StateFromReducersMapObject<typeof reducer>;

export const StorageProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);
