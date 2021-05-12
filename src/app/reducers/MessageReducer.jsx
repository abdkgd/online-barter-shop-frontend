const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_MESSAGE':
            return action.payload
        case 'COMPOSE_MESSAGE':
            return [...state, action.payload]
        case 'UPDATE_MESSAGE':
            return [...state, action.payload]
        default:
            return state
    }
}

export default reducer;