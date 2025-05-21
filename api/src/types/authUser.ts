export interface IAuthUser {
    name: string;
    email: string;
    password: string;
    type: 'retailer' | 'industry';
};