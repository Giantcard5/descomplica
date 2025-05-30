import { 
    verify 
} from 'jsonwebtoken';

import {
    prisma
} from '../utils/prismaClient';

import {
    IStore
} from '../types/store';

export const getStore = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const store = await prisma.store.findUnique({
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
};

export const updateStore = async (token: string, store: IStore) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);


    const currentStore = await prisma.store.findUnique({
        where: {
            userId: decoded.sub as string
        }
    });

    if (!currentStore) {
        throw new Error('Store not found');
    };

    const changedFields: { [key: string]: any } = {};
    for (const key of Object.keys(store) as (keyof IStore)[]) {
        if (store[key] !== currentStore[key]) {
            changedFields[key] = store[key];
        }
    }

    if (Object.keys(changedFields).length === 0) {
        return {
            message: 'No changes detected',
            status: false
        };
    };
    
    await prisma.store.update({
        where: { userId: decoded.sub as string },
        data: changedFields
    });

    return {
        message: 'Store updated successfully',
        status: true
    };
};