export interface IAuth {
    name: string;
    email: string;
    password: string;
    type: 'retailer' | 'industry';
};