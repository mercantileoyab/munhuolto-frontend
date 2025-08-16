const workshopReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKSHOPS':
      return {
        ...state,
        workshops: action.payload,
      };
    case 'EMPTY_WORKSHOPS':
      return {
        ...state,
        workshops: null,
      };
    default:
      return state;
  }
}   

export default workshopReducer;
