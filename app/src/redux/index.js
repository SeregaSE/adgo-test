import { createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import rootReducer from './reducers';
import { rootSaga } from '../saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(rootSaga);