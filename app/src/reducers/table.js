

const initialState = {
    data: []

};

export default function table(state = initialState, action) {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type) {
        case 'SET_DATA':
            newState.data = action.data;
            return newState;
        default:
            return state;
    }
}