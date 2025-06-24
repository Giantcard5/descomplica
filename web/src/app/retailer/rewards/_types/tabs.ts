import { ItemProps } from "./item";

export interface AvailableRewardProps extends ItemProps {
    id: string;
    points: number;
    redeemable: boolean;
    status: 'redeemed' | 'available' | 'pending';
};

export interface AchievementProps extends ItemProps {
    completed: boolean;
    value?: number;
    total?: number;
};