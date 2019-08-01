const SET_FROM = "SET_FROM";
const SET_TO = "SET_TO";

let initialState = {
    from: "2019-06-01",
    to: "2019-06-30"
};

const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FROM:
            return {...state, from: action.value};
        case SET_TO:
            return {...state, to: action.value};
        default:
            return state;
    }
};

export const setFrom = value => ({type: SET_FROM, value});
export const setTo = value => ({type: SET_TO, value});

export default dateReducer;