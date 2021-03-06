const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ACCOUNT':
            return action.payload
        case 'ADD_ACCOUNT':
            return [...state, action.payload]
        case 'UPDATE_ACCOUNT':
                return action.payload
        default:
            return state
    }
}

export default reducer;