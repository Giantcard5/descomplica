import {
    ISettings,
    IProfile,
    IStore,
    INotification,
    ISecurity,
    IPreferences
} from '../types/settings';

export const getProfile = async (profile: IProfile) => {
    return {
        name: 'Renato Soares',
        email: 'renato.cel.renato@gmail.com',
        phoneNumber: '+55 11 98811-7936',
        photoUrl: 'https://avatars.githubusercontent.com/u/69985363?v=4',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    };
};

export const getStore = async (store: IStore) => {
    return {
        name: 'Renato Soares',
        type: 'Marketplace',
        size: 100,
        employees: 10,
        address: 'Rua 123, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345-678',
        country: 'Brasil',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
};

export const getNotifications = async (notifications: INotification) => {
    return {
        email_submision: true,
        email_compaing: true,
        email_rewards_and_points: true,
        email_newsletter: true,
        submission: true,
        compaing: true,
        rewards_and_points: true,
        notification_frequency: 'real-time'
    };
};

export const getSecurity = async (security: ISecurity) => {
    return {
        current_password: '123456',
        new_password: '123456',
        confirm_password: '123456',
        two_factor_authentication: true,
        login_sessions: [
            {
                name: 'Renato Soares',
                type: 'Desktop',
                address: '192.168.1.1',
                last_login: '2021-01-01 12:00:00'
            },
            {
                name: 'Renato Soares',
                type: 'Mobile',
                address: '192.168.1.1',
                last_login: '2021-01-01 12:00:00'
            }
        ]
    };
};

export const getPreferences = async (preferences: IPreferences) => {
    return {
        theme: 'light',
        language: 'en',
        dateFormat: 'dd/mm/yyyy',
        reduceMotion: true
    };
};