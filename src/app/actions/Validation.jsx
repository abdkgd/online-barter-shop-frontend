import * as api from '../api'

export const validateLogin = (login) => async(dispatch) => {
    try {
        const res = await api.validateLogin(login)
        dispatch({type: 'VALIDATE', payload: login});
        return res;
    } catch (error) {
    }
};