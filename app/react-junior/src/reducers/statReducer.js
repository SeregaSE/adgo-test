import {SET_GROUPS, SET_BROWSERS, SET_OPERATING_SYSTEMS, SET_PLATFORMS, SET_STATISTICS} from "../actions/statActions";

const initialState = {
    groupsBy: null,
    platforms: null,
    operatingSystems: null,
    browsers: null,
    currentStatistics: null
};

export function StatReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GROUPS: {
            return {
                ...state, groupsBy: action.payload
            }
        }
        case SET_PLATFORMS: {
            return {
                ...state, platforms: action.payload
            }
        }
        case SET_OPERATING_SYSTEMS: {
            return {
                ...state, operatingSystems: action.payload
            }
        }
        case SET_BROWSERS: {
            return {
                ...state, browsers: action.payload
            }
        }
        case SET_STATISTICS: {
            return {
                ...state, currentStatistics: action.payload
            }

        }
        default:
            return state;
    }
}