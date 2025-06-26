export class FetchService {
    public readonly API_URL: string;

    constructor() {
        this.API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    }

    async fetch(url: string, options: RequestInit = {}) {
        try {
            let headers = { ...options.headers };
            if (!(options.body instanceof FormData)) {
                headers = {
                    'Content-Type': 'application/json',
                    ...headers,
                };
            }

            const response = await fetch(this.API_URL + url, {
                ...options,
                credentials: 'include',
                headers,
            });

            return response;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Failed to fetch') {
                    throw new Error(
                        'Unable to connect to the server. Please check your internet connection and try again.'
                    );
                }

                throw error;
            }
            throw new Error('An unexpected error occurred');
        }
    }
}
