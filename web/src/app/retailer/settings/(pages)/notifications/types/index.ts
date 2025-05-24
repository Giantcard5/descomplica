export interface INotifications {
    email_submision: boolean;
    email_compaing: boolean;
    email_rewards_and_points: boolean;
    email_newsletter: boolean;

    submission: boolean;
    compaing: boolean;
    rewards_and_points: boolean;

    notification_frequency: 'real-time' | 'daily' | 'weekly' | 'never';
};