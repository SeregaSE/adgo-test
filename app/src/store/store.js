import  rootReducer  from './reducers/index';
import { createStore, compose } from 'redux';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const ConfigureStore = preloadedState => (
    createStore(
        rootReducer,
        preloadedState,
        composeEnhancers()
    )
);

const store = ConfigureStore({});

export default store