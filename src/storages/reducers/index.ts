import { combineReducers } from "redux"
import metadataReducer from "./metadata";
import dataReducer from "./data";

const reducers = combineReducers({
  dataReducer,
  metadataReducer
})

export default reducers;