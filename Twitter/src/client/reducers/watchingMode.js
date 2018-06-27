const initialState = {
    isWatchingMode: false
};


export const watchMode = (state = initialState, action) => {
    if (action.type === 'CHANGE_ISWATCHINGMODETRUE') {
        console.log(state.isWatchingMode);
        return {
            ...state,
            isWatchingMode: true
        }
    }
    if (action.type === 'CHANGE_ISWATCHINGMODEFALSE') {
        console.log(state.isWatchingMode);
        return {
            ...state,
            isWatchingMode: false
        }
    }
    return state
};