import { 
    verify 
} from 'jsonwebtoken';

import {
    PrismaClientSingleton
} from '../../utils/prismaClient';

import {
    INotification,
    IPreferences,
    IUpdateNotifications,
    IUpdatePreferences
} from '../../types/settings';

export class SettingsService extends PrismaClientSingleton {
    private static instance: SettingsService;

    private constructor() {
        super();
    }

    static getInstance(): SettingsService {
        if (!SettingsService.instance) {    
            SettingsService.instance = new SettingsService();
        }
        return SettingsService.instance;
    }
    
    async getNotifications(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);
    
        const notifications = await this.prisma.userNotifications.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!notifications) {
            throw new Error('Notifications not found');
        };
    
        return {
            email_submision: notifications.email_submision,
            email_campaign: notifications.email_campaign,
            email_rewards_and_points: notifications.email_rewards_and_points,
            email_newsletter: notifications.email_newsletter,
            submission: notifications.submission,
            campaign: notifications.campaign,
            rewards_and_points: notifications.rewards_and_points,
            notification_frequency: notifications.notification_frequency
        };
    }
    
    async updateNotifications(params: IUpdateNotifications) {
        const decoded = verify(params.token, process.env.JWT_SECRET as string);
    
        const currentNotifications = await this.prisma.userNotifications.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!currentNotifications) {
            throw new Error('Notifications not found');
        };
    
        const changedFields: { [key: string]: any } = {};
        for (const key of Object.keys(params.notifications) as (keyof INotification)[]) {
            if (params.notifications[key] !== currentNotifications[key]) {
                changedFields[key] = params.notifications[key];
            }
        }
    
        if (Object.keys(changedFields).length === 0) {
            return {
                message: 'No changes detected',
                status: false
            };
        };
        
        await this.prisma.userNotifications.update({
            where: { userId: decoded.sub as string },
            data: changedFields
        });
    
        return {
            message: 'Notifications updated successfully',
            status: true
        };
    }

    async getPreferences(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);
    
        const preferences = await this.prisma.userPreferences.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!preferences) {
            throw new Error('Preferences not found');
        };
    
        return {
            theme: preferences.theme,
            language: preferences.language,
            dateFormat: preferences.dateFormat,
            reduceMotion: preferences.reduceMotion
        };
    }

    async updatePreferences(params: IUpdatePreferences) {
        const decoded = verify(params.token, process.env.JWT_SECRET as string);
    
        const currentPreferences = await this.prisma.userPreferences.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!currentPreferences) {
            throw new Error('Preferences not found');
        };
    
        const changedFields: { [key: string]: any } = {};
        for (const key of Object.keys(params.preferences) as (keyof IPreferences)[]) {
            if (params.preferences[key] !== currentPreferences[key]) {
                changedFields[key] = params.preferences[key];
            }
        }
    
        if (Object.keys(changedFields).length === 0) {
            return {
                message: 'No changes detected',
                status: false
            };
        };
        
        await this.prisma.userPreferences.update({
            where: { userId: decoded.sub as string },
            data: changedFields
        });
    
        return {
            message: 'Preferences updated successfully',
            status: true
        };
    }
}

export const settingsService = SettingsService.getInstance();