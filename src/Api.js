import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_QUOTES_API
});

export default api;