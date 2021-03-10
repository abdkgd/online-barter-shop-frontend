import * as api from '../api'

export const getAccountById = (id) => async(dispatch) => {
    try {
        const res = await api.getAccountById(id);
        dispatch({type: 'GET_ACCOUNTID', payload: res});
    } catch (error) {
    }
};