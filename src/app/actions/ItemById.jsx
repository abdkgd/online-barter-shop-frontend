import * as api from '../api'

export const deleteItemById = (id) => async(dispatch) => {
    try {
        const res = await api.deleteItemById(id);
        dispatch({type: 'DELETE_ITEM', payload: id});
        return res;
    } catch (error) {
    }
};