import axios from 'axios';

const accountURL = "http://localhost:7000/api/users"
const authURL = "http://localhost:7000/api/users/usernames";
const validateloginURL = "http://localhost:7000/api/users/validate/login"
const itemURL = "http://localhost:7000/api/items"
const cartURL = "http://localhost:7000/api/cart"

export const getAuth = () => axios.get(authURL);
export const getItems = () => axios.get(itemURL);
export const getAccount = () => axios.get(accountURL);
export const getCart = () => axios.get(cartURL);

export const addAccount =  (account) => axios.post(accountURL, account); 
export const updateAccount = (account) => axios.put(accountURL, account);
export const validateLogin = (login) => axios.post(validateloginURL, login)
export const setItems = (items) => axios.post(itemURL, items);
export const updateItems = (items) => axios.put(itemURL, items);
export const setCart = (cart) => axios.post(cartURL, cart);
export const updateCart = (cart) => axios.put(cartURL, cart);

export const deleteItemById = (id) => axios.delete(`http://localhost:7000/api/items/${id}`) 
export const getItemById = (id) => axios.get(`http://localhost:7000/api/items/${id}`) 
export const getAccountById = (id) => axios.get(`http://localhost:7000/api/users/${id}`)
export const deleteCartById = (id) => axios.delete(`http://localhost:7000/api/cart/${id}`) 