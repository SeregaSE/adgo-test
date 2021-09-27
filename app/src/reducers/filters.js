

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
        from: 0,
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
        case 'CHANGE_FILTER_FROM':
            newState.currentValueFilters.from = action.data;
            return newState;
        case 'CHANGE_FILTER_TO':
            newState.currentValueFilters.to = action.data;
            return newState;
        case 'CHANGE_GROUPS':
            let groupBy = newState.dataFilters.groups.find((item) => {
                return item.value === action.data
            })
            newState.currentValueFilters.groups = groupBy;
            return newState;
        case 'CHANGE_PLATFORM':
            let platform = newState.dataFilters.platforms.find((item) => {
                return Number(item.value) === Number(action.data)
            })
            newState.currentValueFilters.platforms = platform;
            return newState;
        default:
            return state;
    }
}