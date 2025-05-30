export interface INotifications {
    email_submision: boolean;
    email_campaign: boolean;
    email_rewards_and_points: boolean;
    email_newsletter: boolean;

    submission: boolean;
    campaign: boolean;
    rewards_and_points: boolean;

    notification_frequency: 'real_time' | 'daily' | 'weekly' | 'never';
};