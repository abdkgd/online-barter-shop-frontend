import * as api from '../api'

export const getItems = () => async(dispatch) => {
    try {
        const res = await api.getItems();
        dispatch({type: 'GET_ITEMS', payload: res});
    } catch (error) {
    }
};

export const setItems = (items) => async(dispatch) => {
    try {
        const res = await api.setItems(items);
        dispatch({type: 'ADD_ITEMS', payload: items});
        return res;
    } catch (error) {
    }
};