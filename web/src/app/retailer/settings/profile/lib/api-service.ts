interface IProfile {
    name: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    bio: string;
};

class ProfileService {
    private static instance: ProfileService;
    private readonly API_URL: string;

    private constructor() {
        this.API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    }

    static getInstance(): ProfileService {
        if (!ProfileService.instance) {
            ProfileService.instance = new ProfileService();
        }
        return ProfileService.instance;
    }

    private async fetch(url: string, options: RequestInit = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            return response;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Failed to fetch') {
                    throw new Error(
                        'Unable to connect to the server. Please check your internet connection and try again.'
                    );
                };

                throw error;
            }
            throw new Error('An unexpected error occurred');
        };
    };

    async getProfile(): Promise<IProfile> {
        try {
            const response = await this.fetch(`${this.API_URL}/api/settings/profile`, {
                method: 'GET'
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Profile Profile error:', error);
            throw error;
        }
    }

    async postProfile(profile: IProfile): Promise<IProfile> {
        try {
            const response = await this.fetch(`${this.API_URL}/api/settings/profile`, {
                method: 'POST',
                body: JSON.stringify(profile),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Profile Profile error:', error);
            throw error;
        }
    }
}

export const profileService = ProfileService.getInstance();