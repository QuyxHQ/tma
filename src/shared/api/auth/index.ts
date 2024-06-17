import { AsyncLocalStorage } from '../../async.storage';
import env from '../../env';
import toast from '../../toast';
import ApiClient from '../api.client';

export default class AuthSdk {
    private storage: AsyncLocalStorage;

    constructor(private client: ApiClient) {
        this.storage = env.storage;
    }
}
