import { verify } from 'jsonwebtoken';

import { prisma } from '../utils/prismaClient';

import {
    IProfile,
    IStore,
    INotification,
    ISecurity,
    IPreferences
} from '../types/settings';

export const getProfile = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const profile = await prisma.profile.findUnique({
        where: {
            userId: decoded.sub as string
        }
    });

    if (!profile) {
        throw new Error('Profile not found');
    };

    return {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        photoUrl: profile.photoUrl,
        bio: profile.bio
    };
};

export const updateProfile = async (token: string, profile: IProfile) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedProfile = await prisma.profile.update({
        where: {
            userId: decoded.sub as string
        },
        data: {
            ...profile
        }
    });

    if (!updatedProfile) {
        throw new Error('Profile not found');
    };
}

export const getStore = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const store = await prisma.store.findUnique({
        where: {
            userId: decoded.sub as string
        }
    });

    if (!store) {
        throw new Error('Store not found');
    };

    return {
        name: store.name,
        type: store.type,
        size: store.size,
        employees: store.employees,
        address: store.address,
        city: store.city,
        state: store.state,
        zipCode: store.zipCode,
        country: store.country,
        description: store.description
    };
};

export const updateStore = async (token: string, store: IStore) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedStore = await prisma.store.update({
        where: {
            userId: decoded.sub as string
        },
        data: {
            ...store
        }
    });

    if (!updatedStore) {
        throw new Error('Store not found');
    };

    return {
        name: updatedStore.name,
        type: updatedStore.type,
        size: updatedStore.size,
        employees: updatedStore.employees,
        address: updatedStore.address,
        city: updatedStore.city,
        state: updatedStore.state,
        zipCode: updatedStore.zipCode,
        country: updatedStore.country,
        description: updatedStore.description
    };
};

export const getNotifications = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const notifications = await prisma.notification.findUnique({
        where: {
            userId: decoded.sub as string
        }
    });

    if (!notifications) {
        throw new Error('Notifications not found');
    };

    return {
        email_submision: notifications.email_submision,
        email_compaing: notifications.email_compaing,
        email_rewards_and_points: notifications.email_rewards_and_points,
        email_newsletter: notifications.email_newsletter,
        submission: notifications.submission,
        compaing: notifications.compaing,
        rewards_and_points: notifications.rewards_and_points,
        notification_frequency: notifications.notification_frequency
    };
};

export const updateNotifications = async (token: string, notifications: INotification) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedNotifications = await prisma.notification.update({
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

    return {
        email_submision: updatedNotifications.email_submision,
        email_compaing: updatedNotifications.email_compaing,
        email_rewards_and_points: updatedNotifications.email_rewards_and_points,
        email_newsletter: updatedNotifications.email_newsletter,
        submission: updatedNotifications.submission,
        compaing: updatedNotifications.compaing,
        rewards_and_points: updatedNotifications.rewards_and_points,
        notification_frequency: updatedNotifications.notification_frequency
    };
}

export const getSecurity = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const security = await prisma.security.findUnique({
        where: {
            userId: decoded.sub as string
        },
        include: {
            login_sessions: true
        }
    });

    if (!security) {
        throw new Error('Security not found');
    };

    return {
        two_factor_authentication: security.two_factor_authentication,
        login_sessions: security.login_sessions
    };
};

export const updateSecurity = async (token: string, security: ISecurity) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedSecurity = await prisma.security.update({
        where: {
            userId: decoded.sub as string
        },
        data: {
            ...security
        }
    });

    if (!updatedSecurity) {
        throw new Error('Security not found');
    };

    return { message: 'Password updated successfully' };
}

export const getPreferences = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const preferences = await prisma.preferences.findUnique({
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

export const updatePreferences = async (token: string, preferences: IPreferences) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedPreferences = await prisma.preferences.update({
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

    return {
        theme: updatedPreferences.theme,
        language: updatedPreferences.language,
        dateFormat: updatedPreferences.dateFormat,
        reduceMotion: updatedPreferences.reduceMotion
    };
};