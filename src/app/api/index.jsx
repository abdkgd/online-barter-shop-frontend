import axios from 'axios';

const authURL = "http://localhost:7000/api/users/usernames";
export const getAuth = () => axios.get(authURL);

const accountURL = "http://localhost:7000/api/users"
export const addAccount =  (account) => axios.post(accountURL, account); 

const validateloginURL = "http://localhost:7000/api/users/validate/login"
export const validateLogin = (login) => axios.post(validateloginURL, login)