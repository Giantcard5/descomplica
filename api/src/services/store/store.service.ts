import { 
    verify 
} from 'jsonwebtoken';

import {
    PrismaClientSingleton
} from '../../utils/prismaClient';

import {
    IStore,
    IUpdate
} from '../../types/store';

export class StoreService extends PrismaClientSingleton {
    private static instance: StoreService;

    private constructor() {
        super();
    }

    static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
        }
        return StoreService.instance;
    }
    
    async get(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);
    
        const store = await this.prisma.store.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!store) {
            throw new Error('Store not found');
        };
    
        return {
            name: store.name,
            type: store.type,
            size: store.size,
            employees: store.employees,
            address: store.address,
            city: store.city,
            state: store.state,
            zipCode: store.zipCode,
            country: store.country,
            description: store.description
        };
    }

    async update(params: IUpdate) {
        const decoded = verify(params.token, process.env.JWT_SECRET as string);
    
        const currentStore = await this.prisma.store.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!currentStore) {
            throw new Error('Store not found');
        };
    
        const changedFields: { [key: string]: any } = {};
        for (const key of Object.keys(params.store) as (keyof IStore)[]) {
            if (params.store[key] !== currentStore[key]) {
                changedFields[key] = params.store[key];
            }
        }
    
        if (Object.keys(changedFields).length === 0) {
            return {
                message: 'No changes detected',
                status: false
            };
        };
        
        await this.prisma.store.update({
            where: { userId: decoded.sub as string },
            data: changedFields
        });
    
        return {
            message: 'Store updated successfully',
            status: true
        };
    }

    async getStoreId(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);
    
        const store = await this.prisma.store.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!store) {
            throw new Error('Store not found');
        };

        return store.id;
    }
}

export const storeService = StoreService.getInstance();