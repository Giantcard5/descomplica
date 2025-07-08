export interface INotification {
    email_submision: boolean;
    email_campaign: boolean;
    email_rewards_and_points: boolean;
    email_newsletter: boolean;

    submission: boolean;
    campaign: boolean;
    rewards_and_points: boolean;

    notification_frequency: 'real-time' | 'daily' | 'weekly' | 'never';
};

export interface IPreferences {
    language: 'en' | 'pt_BR' | 'es';
    dateFormat: 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd';
    reduceMotion: boolean;
};

export interface IOnboardingSettings {
    language: 'en' | 'pt_BR' | 'es';
    dateFormat: 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd';
    notification: 'real_time' | 'daily' | 'weekly' | 'never';
};

export interface IUpdateNotifications {
    token: string;
    notifications: INotification;
};

export interface IUpdatePreferences {
    token: string;
    preferences: IPreferences;
};