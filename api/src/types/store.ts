export interface IStore {
    name: string;
    type: StoreType;
    size: number;
    employees: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: 'br' | 'us' | 'other';
    description: string;
};

export type StoreType =
    | 'grocery'
    | 'pharmacy'
    | 'convenience'
    | 'hardware'
    | 'clothing'
    | 'electronics'
    | 'bakery'
    | 'butcher'
    | 'pet'
    | 'stationery'
    | 'beauty'
    | 'florist'
    | 'bookstore'
    | 'toy'
    | 'automotive'
    | 'sports'
    | 'furniture'
    | 'jewelry'
    | 'service'
    | 'other';

export interface IOnboardingStore {
    name: string;
    type: StoreType;
    size: number;
    employees: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: 'br' | 'us' | 'other';
    description: string;  
};

export interface IUpdate {
    token: string;
    store: IStore;
};