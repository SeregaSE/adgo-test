import { fork } from 'redux-saga/effects';
import getItems from './getItems'

export function* rootSaga() {
    yield fork(getItems)
}