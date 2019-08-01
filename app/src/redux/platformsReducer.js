import {API} from "../api/api";

const SET_PLATFORMS = "SET_PLATFORMS";
const SET_CURRENT_PLATFORM = "SET_CURRENT_PLATFORM";

let initialState = {
    platforms: [],
    currentPlatform: 1
};

const platformReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLATFORMS:
            return {...state, platforms: [...action.platforms]};
        case SET_CURRENT_PLATFORM:
            return {...state, currentPlatform: action.value};
        default:
            return state;
    }
};

const setPlatforms = platforms => ({type: SET_PLATFORMS, platforms});
export const setCurrentPlatform = value => ({type: SET_CURRENT_PLATFORM, value});

export const getPlatforms = () => dispatch => {
    API.getPlatforms()
        .then(response => {
            if (response.status === 200) {
                dispatch(setPlatforms(response.data));
            }
        });
};

export default platformReducer;