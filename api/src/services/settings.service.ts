import { 
    verify 
} from 'jsonwebtoken';

import { 
    prisma 
} from '../utils/prismaClient';

import {
    INotification,
    IPreferences
} from '../types/settings';

export const getUserNotifications = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const notifications = await prisma.userNotifications.findUnique({
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
};

export const updateUserNotifications = async (token: string, notifications: INotification) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedNotifications = await prisma.userNotifications.update({
        where: {
            userId: decoded.sub as string
        },
        data: {
            ...notifications,
            notification_frequency: notifications.notification_frequency as 'real_time' | 'daily' | 'weekly' | 'never'
        }
    });

    if (!updatedNotifications) {
        throw new Error('Notifications not found');
    };
};

export const createDefaultUserNotifications = async (userId: string) => {
    const createdNotifications = await prisma.userNotifications.create({
        data: {
            userId: userId,
            email_submision: false,
            email_campaign: false,
            email_rewards_and_points: false,
            email_newsletter: false,
            submission: false,
            campaign: false,
            rewards_and_points: false,
            notification_frequency: 'never'
        }
    });

    if (!createdNotifications) {
        throw new Error('Notifications not found');
    };
};

export const getUserPreferences = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const preferences = await prisma.userPreferences.findUnique({
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
};

export const updateUserPreferences = async (token: string, preferences: IPreferences) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedPreferences = await prisma.userPreferences.update({
        where: {
            userId: decoded.sub as string
        },
        data: {
            ...preferences,
            language: preferences.language as 'en' | 'pt_BR' | 'es',
            dateFormat: preferences.dateFormat as 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd'
        }
    });

    if (!updatedPreferences) {
        throw new Error('Preferences not found');
    };
};

export const createDefaultUserPreferences = async (userId: string) => {
    const createdPreferences = await prisma.userPreferences.create({
        data: {
            userId: userId,
            theme: 'light',
            language: 'en',
            dateFormat: 'dd_mm_yyyy',
            reduceMotion: false
        }
    });

    if (!createdPreferences) {
        throw new Error('Couldt create preferences');
    };
};