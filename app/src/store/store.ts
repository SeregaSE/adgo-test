import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer, INITIAL_STATE } from './reducer';

export const store = createStore(reducer, INITIAL_STATE, applyMiddleware(thunk));
store.dispatch({ type: '' });

store.subscribe(() => console.log(store.getState()));

export type RootState = ReturnType<typeof reducer>;
