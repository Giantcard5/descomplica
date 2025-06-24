export interface IRewardRedeem {
    id: string;
    title: string;
    description: string;
    type:
        'credit' |
        'analystic' |
        'support' |
        'training' |
        'ticket' |
        'submission' |
        'streak' |
        'champion' |
        'variety' |
        'master' |
        'accuracy';
    points: number;
    redeemable: boolean;
};
