const reducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ITEMID':
            return action.payload
        case 'DELETE_ITEM':
            return action.payload
        default:
            return state
    }
}

export default reducer;