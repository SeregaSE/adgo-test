let initialState = {
    loading: false,

    platforms: [],
    operatingSystems: [],
    browser: [],
    groups: [],
    statistics: [],

    activePlatform: null,
    activeOperatingSystems: null,
    activeBrowser: null,
    activeGroups: null,

    total: null,
    count: null
}

let newRows;

export const ItemReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_FETCH': 
        return {
            ...state,
            loading: action.payload
        }
        case 'SET_PLATFORMS_LIST':
            return {
                ...state,
                platforms: action.payload
            };
        case 'HANDLE_ACTIVE_PLATFORMS':
            return {
                ...state,
                activePlatform: action.payload
            };
        case 'SET_OPERATING_LIST':
            return {
                ...state,
                operatingSystems: action.payload
            };
        case 'HANDLE_ACTIVE_OPERATING':
            return {
                ...state,
                activeOperatingSystems: action.payload
            };
        case 'SET_BROWSER_LIST':
            return {
                ...state,
                browser: action.payload
            };
        case 'HANDLE_ACTIVE_BROWSER':
            return {
                ...state,
                activeBrowser: action.payload
            };
        case 'SET_GROUPS_LIST':
            return {
                ...state,
                groups: action.payload,
                activeGroups: action.payload[0].value
            };
        case 'HANDLE_ACTIVE_GROUPS':
            return {
                ...state,
                activeGroups: action.payload
            };
        case 'SET_STATISTICS_LIST':
            state.statistics = [];
            newRows = [];
            if(action.payload.rows.length > 0) {
                // копирование элемента, для избежания мутации
                newRows = JSON.parse(JSON.stringify(action.payload.rows));
                // добавление поля id в  каждый объект. Используется для назначения ключей в строках таблицы анализа.  
                newRows.filter((elem, index) =>  elem.id = index);
            }
            
            return {
                ...state,
                statistics: newRows ? newRows : null,
                total: action.payload.total,
                count: action.payload.count
            };
        default:
            return state;
    }
}