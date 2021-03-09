import * as api from '../api'

export const addAccount = (account) => async(dispatch) => {
    try {
        const res = await api.addAccount(account);
        dispatch({type: 'ADD_ACCOUNT', payload: account});
        return res;
    } catch (error) {
    }
};