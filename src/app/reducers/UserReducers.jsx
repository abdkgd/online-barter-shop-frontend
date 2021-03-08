const reducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_LOGIN':
            return action.payload
        default:
            return state
    }
}

export default reducer;