import { combineReducers } from "redux";

import authReducer from "./auth";
import assistReducer from "./assist";
import consultReducer from './consult'

// COMBINED REDUCERS
const reducers = {
  auth: authReducer,
  assist: assistReducer,
  consult: consultReducer,
};

export default combineReducers(reducers);
