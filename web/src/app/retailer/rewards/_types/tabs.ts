import { ItemProps } from "./item";

export interface AvaliableRewardProps extends ItemProps {
    points: number;
};

export interface AchievementProps extends ItemProps {
    completed: boolean;
    value?: number;
    total?: number;
};