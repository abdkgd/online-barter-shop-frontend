
export const loggedIn = (userId) => async(dispatch) =>{
    dispatch({type: 'LOGGED_IN', payload: userId});
}

export const loggedOut = () => async(dispatch) =>{
    dispatch({type: 'LOGGED_OUT'});
}

