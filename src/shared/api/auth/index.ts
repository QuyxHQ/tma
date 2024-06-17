import { AsyncLocalStorage } from '../../async.storage';
import env from '../../env';
import toast from '../../toast';
import ApiClient from '../api.client';

export default class AuthSdk {
    private storage: AsyncLocalStorage;

    constructor(private client: ApiClient) {
        this.storage = env.storage;
    }

    async signIn(tg_init: string) {
        const { error, data, statusCode } = await this.client
            .getInstance()
            .post('/auth/telegram', { tg_init });

        if (error) {
            if (statusCode == 422) return null;

            toast({
                type: 'error',
                message: data.error || 'Unable to complete request',
            });

            return false;
        }

        const { accessToken, refreshToken } = data.data;

        await Promise.all([
            this.storage.setItem('access_token', accessToken),
            this.storage.setItem('refresh_token', refreshToken),
        ]);

        return { accessToken, refreshToken };
    }

    async signOut() {
        const { error, data } = await this.client.getInstance().delete('/session/current');

        if (error) {
            toast({
                type: 'error',
                message: data.error || 'Could not terminate sessions',
            });

            return false;
        }

        const { acknowledged, modifiedCount } = data.data.data;

        if (!acknowledged || modifiedCount == 0) {
            toast({
                type: 'error',
                message: 'Could not complete request',
            });

            return false;
        }

        await Promise.all([
            this.storage.removeItem('access_token'),
            this.storage.removeItem('refresh_token'),
        ]);

        return true;
    }
}
