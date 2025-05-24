import { 
    FetchService 
} from '../../../(lib)/fetch-service';

import { 
    INotifications 
} from '../types';

class NotificationsService extends FetchService {
    private static instance: NotificationsService;

    private constructor() {
        super();
    };

    static getInstance(): NotificationsService {
        if (!NotificationsService.instance) {
            NotificationsService.instance = new NotificationsService();
        };
        return NotificationsService.instance;
    };

    async getNotifications(): Promise<INotifications> {
        try {
            const response = await this.fetch('/api/settings/notifications', {
                method: 'GET'
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Notifications error:', error);
            throw error;
        };
    };

    async postNotifications(Notifications: INotifications): Promise<INotifications> {
        try {
            const response = await this.fetch('/api/settings/notifications', {
                method: 'POST',
                body: JSON.stringify(Notifications),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Notifications error:', error);
            throw error;
        };
    };
};

export const notificationsService = NotificationsService.getInstance();