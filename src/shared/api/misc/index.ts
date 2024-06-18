import toast from '../../toast';
import ApiClient from '../api.client';

export default class MiscSdk {
    constructor(private client: ApiClient) {}

    async uploadImage(base64image: string) {
        const { error, data } = await this.client
            .getInstance()
            .post('/misc/upload', { image: base64image.split(',')[1] });

        if (error) {
            toast({
                type: 'error',
                message: data.error || 'Unable to upload image',
            });

            return;
        }

        return (data?.data.uri as string) ?? undefined;
    }
}
