import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import dataReducer from "./reducers/dataReducer";
import metadataReducer from "./reducers/metadataReducer";

export const storage = createStore(combineReducers({
  dataReducer,
  metadataReducer
}), composeWithDevTools(applyMiddleware(thunk)));
