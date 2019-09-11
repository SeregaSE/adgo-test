import * as AT from './actions-type';

const loading = {
  label: 'Loading...',
  value: 'Loading...',
};

const initialState = {
  isFetching: {
    groups: false,
    operatingSystems: false,
    browsers: false,
    platforms: false,
  },

  options: {
    groups: [loading],
    operatingSystems: [loading],
    browsers: [loading],
    platforms: [loading],
  },
};

export default ( state = { ...initialState }, actions ) => {
  switch(actions.type) {
    case AT.GET_OPTIONS:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [actions.payload.type]: true,
        },
      }

    case AT.GET_OPTIONS_SUCCESS:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [actions.payload.type]: false,
        },
        options: {
          ...state.options,
          [actions.payload.type]: actions.payload.options,
        },
      }

    case AT.GET_OPTIONS_FAIL:
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [actions.payload.type]: false,
        },
      }

    default:
      return {
        ...state,
      }
  }
}
