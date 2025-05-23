export interface IProfile {
    name: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    bio: string;
};

export interface IStore {
    name: string;
    type: StoreType;
    size: number;
    employees: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: 'br' | 'us' | 'other';
    description: string;
};

export type StoreType =
    | 'grocery'
    | 'pharmacy'
    | 'convenience'
    | 'hardware'
    | 'clothing'
    | 'electronics'
    | 'bakery'
    | 'butcher'
    | 'pet'
    | 'stationery'
    | 'beauty'
    | 'florist'
    | 'bookstore'
    | 'toy'
    | 'automotive'
    | 'sports'
    | 'furniture'
    | 'jewelry'
    | 'service'
    | 'other';

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

export interface ISecurity {
    current_password: string;
    new_password: string;
    confirm_password: string;
};

export interface IPreferences {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'pt-BR' | 'es';
    dateFormat: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy/mm/dd';
    reduceMotion: boolean;
};