const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ITEMS':
            return action.payload
        case 'ADD_ITEMS':
            return [...state, action.payload]
        default:
            return state
    }
}

export default reducer;