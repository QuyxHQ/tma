import toast from '../../toast';
import ApiClient from '../api.client';

export default class IdentitySdk {
    constructor(private client: ApiClient) {}

    async issueVC(payload: Record<string, any>, expires?: number) {
        const { error, data } = await this.client
            .getInstance()
            .post('/identity/issue-vc', { payload, expires });

        if (error) {
            toast({
                type: 'error',
                message: data.error || 'Oops! Could not issue credential',
            });

            return false;
        }

        toast({
            type: 'success',
            message: 'Credential issued successfully!',
        });

        return true;
    }

    async revokeAccess(hash: string, did: string) {
        const { error, data } = await this.client
            .getInstance()
            .delete(`/identity/revoke/${did}/${hash}`);

        if (error) {
            toast({
                type: 'error',
                message: data.error || 'Oops! Could not revoke space access to credential',
            });

            return false;
        }

        toast({
            type: 'success',
            message: 'Space access revoked!',
        });

        return true;
    }

    async revoke(hash: string) {
        const { error, data } = await this.client.getInstance().delete(`/identity/revoke/${hash}`);

        if (error) {
            toast({
                type: 'error',
                message: data.error || 'Oops! Could not revoke credential',
            });

            return false;
        }

        toast({
            type: 'success',
            message: 'Credential revoked!',
        });

        return true;
    }

    async getCredentials(page = 1, limit = 30, revalidate: 'yes' | 'no' = 'no') {
        const { data, error } = await this.client
            .getInstance()
            .get(`/identity/user?page=${page}&limit=${limit}&revalidate=${revalidate}`);

        if (error) return undefined;

        const { total, data: credentials } = data.data;
        return { total, credentials } as { total: number; credentials: any[] };
    }

    async getCredentialFromHash(hash: string, revalidate: 'yes' | 'no' = 'no') {
        const { error, data } = await this.client
            .getInstance()
            .get(`/identity/${hash}?revalidate=${revalidate}`);

        if (error) return undefined;
        return data.data as SingleCredentialData;
    }
}
