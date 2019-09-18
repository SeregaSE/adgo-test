import { combineReducers } from "redux";
import { StatReducer } from "./StatReducer";


export const rootReducer = combineReducers({
    statistic: StatReducer,
});