import { createAsyncLocalStorage } from './async.storage';

const { BASE_URL, PROD, VITE_API_ENDPOINT } = import.meta.env;

const API_ENDPOINT = VITE_API_ENDPOINT || 'http://localhost:3000/';
const storage = createAsyncLocalStorage('tma');

export default {
    BASE_URL,
    IS_PROD: PROD,
    API_ENDPOINT,
    storage,
};
