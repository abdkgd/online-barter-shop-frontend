const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_CART':
            return action.payload
        case 'ADD_CART':
            return [...state, action.payload]
        case 'UPDATE_CART':
            return action.payload
        default:
            return state
    }
}

export default reducer;