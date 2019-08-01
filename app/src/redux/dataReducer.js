import {API} from "../api/api";

const SET_DATA = "SET_DATA";
const SET_COUNT = "SET_COUNT";
const SET_TOTAL = "SET_TOTAL";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_OFFSET = "SET_OFFSET";

let initialState = {
    currentPage: 1,
    pageSize: 5,
    offset: 0,
    count: 0,
    data: [],
    total: {
        impressions: null,
        clicks: null,
        money: null
    }
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {...state, data: [...action.data]};
        case SET_COUNT:
            return {...state, count: action.value};
        case SET_TOTAL:
            return {...state, total: {...action.total}};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page};
        case SET_OFFSET:
            return {...state, offset: action.offset};
        default:
            return state;
    }
};

const setCount = value => ({type: SET_COUNT, value});
const setData = data => ({type: SET_DATA, data});
const setTotal = total => ({type: SET_TOTAL, total});
export const setCurrentPage = page => ({type: SET_CURRENT_PAGE, page});
export const setOffset = offset => ({type: SET_OFFSET, offset});

export const getData = (from, to, groupBy, platform = 1, browsers = [1], operatingSystems = [1], limit = 5, offset = 0) => dispatch => {
    API.getData(from, to, groupBy, platform, browsers, operatingSystems, limit, offset)
        .then(response => {
            if (response.status === 200) {
                dispatch(setCount(response.data.count));
                dispatch(setData(response.data.rows));
                dispatch(setTotal(response.data.total));
            }
        });
};

export default dataReducer;