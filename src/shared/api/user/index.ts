import toast from '../../toast';
import ApiClient from '../api.client';

export default class UserSdk {
    constructor(private client: ApiClient) {}

    async whoami() {}
}
