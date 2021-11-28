import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { dataReducer } from "./reducers/data";
import { metadataReducer } from "./reducers/metadata";

export const storage = createStore(combineReducers({
  dataReducer,
  metadataReducer
}), composeWithDevTools(applyMiddleware(thunk)));
