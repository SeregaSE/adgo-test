import {API} from "../api/api";

const SET_BROWSERS = "SET_BROWSERS";
const SET_CURRENT_BROWSER = "SET_CURRENT_BROWSER";

let initialState = {
    browsers: [],
    currentBrowser: 1
};

const browsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BROWSERS:
            return {...state, browsers: [...action.browsers]};
        case SET_CURRENT_BROWSER:
            return {...state, currentBrowser: action.value};
        default:
            return state;
    }
};

const setBrowsers = browsers => ({type: SET_BROWSERS, browsers});
export const setCurrentBrowser = value => ({type: SET_CURRENT_BROWSER, value});

export const getBrowsers = () => dispatch => {
    API.getBrowsers()
        .then(response => {
            if (response.status === 200) {
                dispatch(setBrowsers(response.data));
            }
        });
};

export default browsersReducer;