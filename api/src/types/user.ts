export interface IUser {
    name: string;
    email: string;
    password: string;
    type: 'retailer' | 'industry';
};