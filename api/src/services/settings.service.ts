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

    const currentNotifications = await prisma.userNotifications.findUnique({
        where: {
            userId: decoded.sub as string
        }
    });

    if (!currentNotifications) {
        throw new Error('Notifications not found');
    };

    const changedFields: { [key: string]: any } = {};
    for (const key of Object.keys(notifications) as (keyof INotification)[]) {
        if (notifications[key] !== currentNotifications[key]) {
            changedFields[key] = notifications[key];
        }
    }

    if (Object.keys(changedFields).length === 0) {
        return {
            message: 'No changes detected',
            status: false
        };
    };
    
    await prisma.userNotifications.update({
        where: { userId: decoded.sub as string },
        data: changedFields
    });

    return {
        message: 'Notifications updated successfully',
        status: true
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

    const currentPreferences = await prisma.userPreferences.findUnique({
        where: {
            userId: decoded.sub as string
        }
    });

    if (!currentPreferences) {
        throw new Error('Preferences not found');
    };

    const changedFields: { [key: string]: any } = {};
    for (const key of Object.keys(preferences) as (keyof IPreferences)[]) {
        if (preferences[key] !== currentPreferences[key]) {
            changedFields[key] = preferences[key];
        }
    }

    if (Object.keys(changedFields).length === 0) {
        return {
            message: 'No changes detected',
            status: false
        };
    };
    
    await prisma.userPreferences.update({
        where: { userId: decoded.sub as string },
        data: changedFields
    });

    return {
        message: 'Preferences updated successfully',
        status: true
    };
};