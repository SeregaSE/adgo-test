import { call, all, put, takeLatest } from 'redux-saga/effects';
import { setPlatformsList, setOperatingList, setBrowserList, setGroupsList, setStatisticsList, loadingFetch } from '../redux/actions/actionCreater';
import axios from 'axios';

function* fetchPlatforms() {
    try {
        const result = yield call(() => {
            return axios.get('http://localhost:3000/api/v1/platforms')
        });
        yield put(setPlatformsList(result.data))
    } catch (error) {
        console.log(error, 'error fetch Platforms')
    }
}

function* fetchOperating() {
    try {
        const result = yield call(() => {
            return axios.get('http://localhost:3000/api/v1/operating-systems')
        });
        yield put(setOperatingList(result.data))
    } catch (error) {
        console.log(error, 'error fetch Operating')
    }
}

function* fetchBrowser() {
    try {
        const result = yield call(() => {
            return axios.get('http://localhost:3000/api/v1/browsers')
        });
        yield put(setBrowserList(result.data))
    } catch (error) {
        console.log(error, 'error fetch Browser')
    }
}

function* fetchGroups() {
    try {
        const result = yield call(() => {
            return axios.get('http://localhost:3000/api/v1/groups')
        });
        yield put(setGroupsList(result.data))
    } catch (error) {
        console.log(error, 'error fetch Groups')
    }
}

function* fetchStatistic({ activePlatform, activeOperatingSystems, activeBrowser, activeGroups, dateFrom, dateTo, currentPage  }) {
    yield put(loadingFetch(true));

    try {
         let setStringForFetch = (elem, isBrowser) => {
            let stringForFetch = '';
            if(elem !== null && elem !== 1) {
                if(isBrowser) 
                    for(let value of elem) stringForFetch += `&browser[]=${value}`;
                else 
                    for(let value of elem) stringForFetch += `&operatingSystems[]=${value}`;
            }
            return stringForFetch;
        } 
        const result = yield call(() => {
            return axios.get('http://localhost:3000/api/v1/statistics?' 
            + 'groupBy=' + activeGroups + '&from=' + dateFrom + '&to=' + dateTo
            + `&offset=${currentPage > 1 ? currentPage - 1 : '0'}` 
            + `${activePlatform ? '&platform=' + activePlatform : ''}` 
            + setStringForFetch(activeBrowser, true) + setStringForFetch(activeOperatingSystems, false))
        });
        yield put(setStatisticsList(result.data))
    } catch (error) {
        console.log(error, 'error fetch Statistics')
    }
    yield put(loadingFetch(false));
}

function* root() {
    yield all([
        takeLatest('GET_PLATFORMS_LIST', fetchPlatforms),
        takeLatest('GET_OPERATING_LIST', fetchOperating),
        takeLatest('GET_BROWSER_LIST', fetchBrowser),
        takeLatest('GET_GROUPS_LIST', fetchGroups),
        takeLatest('GET_STATISTIC', fetchStatistic)
    ]);
}
export default root;