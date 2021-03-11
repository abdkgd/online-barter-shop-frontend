import * as api from '../api'

export const deleteCartById = (id) => async(dispatch) => {
    try {
        const res = await api.deleteCartById(id);
        dispatch({type: 'DELETE_CART', payload: id});
        return res;
    } catch (error) {
    }
};