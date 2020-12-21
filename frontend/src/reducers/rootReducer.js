const initState = {
    auth: false,
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'AUTH') {
        return {
            ...state,
            auth: action.auth
        }
    }
    return state;
}

export default rootReducer