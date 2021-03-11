import * as api from '../api'

export const getCart = () => async(dispatch) => {
    try {
        const res = await api.getCart();
        dispatch({type: 'GET_CART', payload: res});
    } catch (error) {
    }
};

export const setCart = (cart) => async(dispatch) => {
    try {
        const res = await api.setCart(cart);
        dispatch({type: 'ADD_CART', payload: cart});
        return res;
    } catch (error) {
    }
};

export const updateCart = (cart) => async(dispatch) => {
    try {
        const res = await api.updateCart(cart);
        dispatch({type: 'UPDATE_CART', payload: cart});
        return res;
    } catch (error) {
    }
};