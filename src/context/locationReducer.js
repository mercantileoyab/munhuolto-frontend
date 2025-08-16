const locationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    case 'SET_LOCATION_ADDRESS':
      return {
        ...state,
        locationAddress: action.payload,
      };
    case 'EMPTY_LOCATION':
      return {
        ...state,
        location: null,
        locationAddress: null,
      };
    default:
      return state;
  }
}

export default locationReducer;