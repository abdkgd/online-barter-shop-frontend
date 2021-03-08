import axios from 'axios';

const authURL = "http://localhost:7000/api/users/userpass";
const accountURL = "http://localhost:7000/api/users"

export const getAuth = () => axios.get(authURL);
export const addAccount = (account) => axios.post(accountURL, account); 