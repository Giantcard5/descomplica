import { FetchService } from '../../../(lib)/fetch-service';

import { ISecurity } from '../types';

class SecurityService extends FetchService {
    private static instance: SecurityService;

    private constructor() {
        super();
    }

    static getInstance(): SecurityService {
        if (!SecurityService.instance) {
            SecurityService.instance = new SecurityService();
        }
        return SecurityService.instance;
    }

    async getSecurity(): Promise<{
        two_factor_authentication: boolean;
        login_sessions: {
            name: string;
            type: string;
            address: string;
            last_login: string;
        }[];
    }> {
        try {
            const response = await this.fetch('/api/session', {
                method: 'GET',
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Security error:', error);
            throw error;
        }
    }

    async postSecurity(security: ISecurity): Promise<{
        message: string;
        status: boolean;
    }> {
        try {
            const response = await this.fetch('/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(security),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Security error:', error);
            throw error;
        }
    }
}

export const securityService = SecurityService.getInstance();
