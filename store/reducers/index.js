import { combineReducers } from "redux";

import authReducer from "./auth";
import assistReducer from "./assist";

// COMBINED REDUCERS
const reducers = {
  auth: authReducer,
  assist: assistReducer,
};

export default combineReducers(reducers);
