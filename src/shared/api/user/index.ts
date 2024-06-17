import ApiClient from '../api.client';

export default class UserSdk {
    constructor(private client: ApiClient) {}

    async whoami() {
        const { data } = await this.client.getInstance().get('/user/whoami');
        return data?.data as User | undefined;
    }

    async getUserNfts(address: string, page = 1, limit = 20) {
        const { data } = await this.client
            .getInstance()
            .get(`/user/nfts/${address}?page=${page}&limit=${limit}`);

        return (data?.data as { nft: NftItem; user: User | null; isBookmarked: boolean }[]) ?? [];
    }
}
