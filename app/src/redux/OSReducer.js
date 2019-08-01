import {API} from "../api/api";

const SET_OS = "SET_OS";
const SET_CURRENT_SYSTEM = "SET_CURRENT_SYSTEM";

let initialState = {
    OSs: [],
    currentSystem: 1
};

const OSReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OS:
            return {...state, OSs: [...action.systems]};
        case SET_CURRENT_SYSTEM:
            return {...state, currentSystem: action.value};
        default:
            return state;
    }
};

const setOSs = systems => ({type: SET_OS, systems});
export const setCurrentSystem = value => {
    return {
        type: SET_CURRENT_SYSTEM,
        value
    }
};

export const getOSs = () => dispatch => {
    API.getOS()
        .then(response => {
            if (response.status === 200) dispatch(setOSs(response.data));
        });
};

export default OSReducer;