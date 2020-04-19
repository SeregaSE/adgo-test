import {combineReducers} from "redux";
import {StatReducer} from "./statReducer";

export const rootReducer = combineReducers({
    statistic: StatReducer,
});