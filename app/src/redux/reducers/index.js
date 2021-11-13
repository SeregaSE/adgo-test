import { combineReducers } from 'redux';
import { ItemReducers } from './reducers';

const rootReducers = combineReducers({
    elem: ItemReducers
})

export default rootReducers;