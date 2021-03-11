import * as api from '../api'

export const getItemById = (id) => async(dispatch) => {
    try {
        const res = await api.getItemById(id);
        dispatch({type: 'GET_ITEMID', payload: res});
    } catch (error) {
    }
};

export const deleteItemById = (id) => async(dispatch) => {
    try {
        const res = await api.deleteItemById(id);
        dispatch({type: 'DELETE_ITEM', payload: id});
        return res;
    } catch (error) {
    }
};