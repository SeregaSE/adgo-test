import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSagas from './rootSagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  //applyMiddleware(sagaMiddleware),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

rootSagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
