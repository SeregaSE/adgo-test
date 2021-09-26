

const initialState = {
    // данные по фильтрам
    dataFilters: {
        groups: [],
        platforms: [],
        operatingSystems: [],
        browsers: []
    },
    // значения выбранных фильтров
    currentValueFilters: {
        to: 0,
        groups: {
            value: 0,
            label: ""
        },
        platforms: {
            value: 0,
            label: ""
        }
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