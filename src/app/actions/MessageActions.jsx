import * as api from '../api'

export const getMessages = () => async(dispatch) => {
    try {
        const res = await api.getMessages();
        dispatch({type: 'GET_MESSAGE', payload: res});
    } catch (error) {
    }
};

export const composeMessage = (message) => async(dispatch) => {
    try {
        const res = await api.composeMessage(message);
        dispatch({type: 'COMPOSE_MESSAGE', payload: message});
        return res;
    } catch (error) {
    }
};

export const updateMessage = (message) => async(dispatch) => {
    try {
        const res = await api.updateMessage(message);
        dispatch({type: 'UPDATE_MESSAGE', payload: message});
        return res;
    } catch (error) {
    }
};

export const deleteMessageById = (id) => async(dispatch) => {
    try {
        const res = await api.deleteMessageById(id);
        dispatch({type: 'DELETE_MESSAGE', payload: id});
        return res;
    } catch (error) {
    }
};