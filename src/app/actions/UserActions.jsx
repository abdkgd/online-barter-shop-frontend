import * as api from '../api'

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAuth();
        dispatch({type: 'FETCH_LOGIN', payload: data});
    } catch (error) {
        console.log(error.message);
    }
};