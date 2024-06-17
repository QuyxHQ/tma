import { AxiosError, AxiosResponse } from 'axios';
import { HttpClient } from '../http.util';
import env from '../env';

export default class ApiClient extends HttpClient {
    constructor(options?: { access_token: string; refresh_token: string }) {
        super({
            baseURL: env.API_ENDPOINT,
            headers: {
                accept: 'application/json',
                ...(options
                    ? {
                          Authorization: `Bearer ${options.access_token}`,
                          'X-Refresh': options.refresh_token,
                      }
                    : {}),
                'content-type': 'application/json',
            },
        });
    }

    async _handleResponse({ data, status: statusCode, headers }: AxiosResponse<any>) {
        const newAccessToken = headers['x-access-token'];
        if (newAccessToken) await env.storage.setItem('access_token', newAccessToken);

        if (data.data && 'status' in data.data && !data.data.status) {
            return { error: true, statusCode, data };
        }

        return { error: false, statusCode, data };
    }

    _handleError(error: AxiosError<any>) {
        const response = {
            error: true,
            statusCode: error.response?.status,
            data: error.response?.data,
        };

        return response;
    }

    getInstance() {
        return this.instance;
    }

    getInstanceWithoutAuth() {
        return this.instanceWithoutAuth;
    }
}
