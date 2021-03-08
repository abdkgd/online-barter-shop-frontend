import axios from 'axios';

const authURL = "http://localhost:7000/api/users/userpass";
export const getAuth = () => axios.get(authURL);

const accountURL = "http://localhost:7000/api/users"
export const addAccount = (account) => axios.post(accountURL, account); 