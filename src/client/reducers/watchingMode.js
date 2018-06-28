const initialState = {
  isWatchingMode: false,
};


export const watchMode = (state = initialState, action) => {
  if (action.type === 'CHANGE_IS_WATCHING_MODE') {
    return {
      ...state,
      isWatchingMode: action.payload,
    };
  }
  return state;
};
