

const initialState = {
    // данные по фильтрам
    dataFilters: {},
    // значения выбранных фильтров
    currentValueFilters: {
        to: 0,
    }
};

export default function filters(state = initialState, action) {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type) {
        case 'INIT_DATA_FILTERS':
            newState.dataFilters = action.data;
            return newState;
        case 'INIT_CURRENT_VALUE_FILTERS':
            newState.currentValueFilters = action.data;
            return newState;
        default:
            return state;
    }
}