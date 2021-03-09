const reducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            window.localStorage.setItem("creds", JSON.stringify(action.payload))
            return action.payload
        case 'LOGGED_OUT':
            window.localStorage.clear()
            return null;
        default:
            return state
    }
}

export default reducer;