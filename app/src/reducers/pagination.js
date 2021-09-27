

const initialState = {
    count: 0,
    page: 0,
    limit: 25
};

export default function pagination(state = initialState, action) {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type) {
        case 'SET_PAGINATION':
            newState.count = action.data.count;
            newState.page = action.data.page;
            return newState;
        case 'TURN_PAGE':
            newState.data = action.data;
            return newState;
        default:
            return state;
    }
}