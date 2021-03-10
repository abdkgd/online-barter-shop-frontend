const reducer = (state = [], action) => {
    switch (action.type) {
        case 'DELETE_ITEM':
            return action.payload
        default:
            return state
    }
}

export default reducer;