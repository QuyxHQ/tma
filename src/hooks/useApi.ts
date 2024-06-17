import ApiClient from '../shared/api/api.client';
import AuthSdk from '../shared/api/auth';
import IdentitySdk from '../shared/api/identity';
import UserSdk from '../shared/api/user';
import env from '../shared/env';

export default async function (props?: { access_token: string; refresh_token: string }) {
    let client = new ApiClient();

    if (props) {
        client = new ApiClient({ ...props });
    } else {
        const storage = env.storage;

        const [access_token, refresh_token] = await Promise.all([
            await storage.getItem('access_token'),
            await storage.getItem('refresh_token'),
        ]);

        if (access_token && refresh_token) client = new ApiClient({ access_token, refresh_token });
    }

    const authSdk = new AuthSdk(client);
    const identitySdk = new IdentitySdk(client);
    const userSdk = new UserSdk(client);

    return { auth: authSdk, identity: identitySdk, user: userSdk };
}
