export interface ITokenPayload {
    sub: string;
    iat: number;
    exp?: number;
    type: 'retailer' | 'industry';
};