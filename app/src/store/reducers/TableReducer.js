let initialState = {
    sortData: [],
    defaultData: [],
    optionsGroup: {
        groupby: [],
        platform: [],
        os: [],
        browser: []
    },
    urlState: {
        browsers: {
            url: 'browsers[]=',
            value: ''
        },
        platform: {
            url: 'platform=',
            value: ''
        },
        os: {
            url: 'operatingSystems[]=',
            value: ''
        },
        from: {
            url: 'from',
            value: ''
        },
        to: {
            url: 'to',
            value: ''
        },
        limit: 25,
        offset: 0,
        groupby: {
            url: 'groupBy',
            value: 'day'
        }

    },
    paginate: {
        activePage: 1,
        items: 3,
        maxButtons: 10,
        count: 25
    }
}

export default function(state = initialState, action) {
    
    switch(action.type) {
        case 'DEFAULT_DATA' :
          return {
              ...state,
              defaultData: action.payload,
              paginate: {
                  ...state.paginate,
                  items: action.items
              }
          } 
          
        case 'OPTIONS_GROUP' :
            return {
                ...state,
                optionsGroup: action.payload
            } 
        case 'SET_URL' :
            return {
                ...state,
                urlState: {
                    ...state.urlState,
                    offset: action.offset,
                    [action.urltype] : {
                        url: state.urlState[action.urltype].url,
                        value: action.value
                        }
                    },
                paginate: {
                        ...state.paginate,
                        activePage: action.activePage, 
                    }
                }
            
        case 'CHANGE_PAGE' :
            return {
                ...state,
                urlState: {
                    ...state.urlState,
                    offset: action.offset
                },
                paginate: {
                    ...state.paginate,
                    activePage: action.page
                }
            }       
    }

    return state
}