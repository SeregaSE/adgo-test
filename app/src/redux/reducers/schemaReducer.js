const initialState = {
  platforms: [],
  brouser:[],
  operatingSystem:[],
  groups:[],
  spisok:[],
  
};

const todoReducer = (state = initialState.platforms, action) => {

  switch (action.type) {

    case 'ADDPLATFORMS':
      return{
        ...state,
        platforms:action.payload
      };
    case 'ADDBROUSER':
      return{
        ...state,
        brouser:action.payload
      };
    case 'OPERATINGSYSTEMS':
      return{
        ...state,
        operatingSystem:action.payload
      };

    case 'GROUPS':
      return{
        ...state,
        groups:action.payload
      };
    case 'ADDSPISOK':
      return{
        ...state,
        spisok:action.payload
      };

    default:
      return state;
  }
};

export default todoReducer;
