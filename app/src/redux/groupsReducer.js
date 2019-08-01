import {API} from "../api/api";

const SET_GROUPS = "SET_GROUPS";
const SET_CURRENT_GROUP = "SET_CURRENT_GROUP";

let initialState = {
    groups: [],
    currentGroup: "day"
};

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GROUPS:
            return {...state, groups: action.groups};
        case SET_CURRENT_GROUP:
            return {...state, currentGroup: action.value};
        default:
            return state;
    }
};

const setGroups = groups => ({type: SET_GROUPS, groups});
export const setCurrentGroup = value => ({type: SET_CURRENT_GROUP, value});

export const getGroups = () => dispatch => {
    API.getGroups()
        .then(response => {
            if (response.status === 200) {
                dispatch(setGroups(response.data));
            }
        });
};

export default groupsReducer;