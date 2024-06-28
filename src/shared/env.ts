import { createAsyncLocalStorage } from './async.storage';

const {
    BASE_URL,
    PROD,
    VITE_API_ENDPOINT,
    VITE_TELEMETREE_PROJECT_ID,
    VITE_TELEMETREE_API_KEY,
    VITE_TELEMETREE_APP_NAME,
} = import.meta.env;

const API_ENDPOINT = VITE_API_ENDPOINT || 'http://localhost:3000/';
const storage = createAsyncLocalStorage('tma');

export default {
    BASE_URL,
    IS_PROD: PROD,
    API_ENDPOINT,
    storage,
    TELEMETREE_PROJECT_ID: VITE_TELEMETREE_PROJECT_ID,
    TELEMETREE_API_KEY: VITE_TELEMETREE_API_KEY,
    TELEMETREE_APP_NAME: VITE_TELEMETREE_APP_NAME,
};
