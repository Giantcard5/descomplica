import { ItemProps } from "./item";

export interface AvailableRewardProps extends ItemProps {
    points: number;
    redeemable: boolean;
};

export interface AchievementProps extends ItemProps {
    completed: boolean;
    value?: number;
    total?: number;
};