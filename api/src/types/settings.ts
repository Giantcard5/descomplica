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
    language: 'en' | 'pt_BR' | 'es';
    dateFormat: 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd';
    reduceMotion: boolean;
};

export interface IOnboardingSettings {
    language: 'en' | 'pt_BR' | 'es';
    theme: 'light' | 'dark' | 'system';
    dateFormat: 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd';
    notification: 'real_time' | 'daily' | 'weekly' | 'never';
}