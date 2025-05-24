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
        current_password: security.current_password,
        new_password: security.new_password,
        confirm_password: security.confirm_password,
        two_factor_authentication: security.two_factor_authentication,
        login_sessions: security.login_sessions
    };
};

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