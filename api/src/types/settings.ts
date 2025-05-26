export interface INotification {
    email_submision: boolean;
    email_compaing: boolean;
    email_rewards_and_points: boolean;
    email_newsletter: boolean;

    submission: boolean;
    compaing: boolean;
    rewards_and_points: boolean;

    notification_frequency: 'real-time' | 'daily' | 'weekly' | 'never';
};

export interface IPreferences {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'pt-BR' | 'es';
    dateFormat: 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd';
    reduceMotion: boolean;
};