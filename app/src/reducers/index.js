import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import platforms from "./platforms";
import browsers from "./browsers";
import operatingSystems from "./operating-systems";
import groups from "./groups";
import statistics from "./statistics";

const rootReducer = createStore(
  combineReducers({
    platforms,
    browsers,
    operatingSystems,
    groups,
    statistics
  }),
  applyMiddleware(thunk)
);

export default rootReducer;
