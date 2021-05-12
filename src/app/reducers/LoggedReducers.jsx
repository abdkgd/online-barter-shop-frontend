const reducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            const rememberme = JSON.parse(window.localStorage.getItem("rememberme"));
            if(rememberme){
                window.localStorage.setItem("creds", JSON.stringify(action.payload))
            }
            else{
                window.sessionStorage.setItem("creds", JSON.stringify(action.payload))
            }
            return action.payload
        case 'LOGGED_OUT':
            window.localStorage.clear();
            window.sessionStorage.clear();
            return null
            
        default:
            return state
    }
}

export default reducer;