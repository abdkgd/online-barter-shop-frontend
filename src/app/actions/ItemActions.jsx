import * as api from '../api'

export const getItems = () => async(dispatch) => {
    try {
        const res = await api.getItems();
        dispatch({type: 'GET_ITEMS', payload: res});
    } catch (error) {
    }
};