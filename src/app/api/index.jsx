import axios from 'axios';

const authURL = "http://localhost:7000/api/users/usernames";
export const getAuth = () => axios.get(authURL);

const accountURL = "http://localhost:7000/api/users"
export const addAccount =  (account) => axios.post(accountURL, account); 
export const getAccount = () => axios.get(accountURL);

export const getAccountById = (id) => axios.get(`http://localhost:7000/api/users/${id}`)

const validateloginURL = "http://localhost:7000/api/users/validate/login"
export const validateLogin = (login) => axios.post(validateloginURL, login)

const itemURL = "http://localhost:7000/api/items"
export const getItems = () => axios.get(itemURL);
export const setItems = (items) => axios.post(itemURL, items);

export const deleteItemById = (id) => axios.delete(`http://localhost:7000/api/items/${id}`) 