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

    const updatedStore = await prisma.store.update({
        where: {
            userId: decoded.sub as string
        },
        data: {
            ...store
        }
    });

    if (!updatedStore) {
        throw new Error('Store not found');
    };
};

export const createStore = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const createdStore = await prisma.store.create({
        data: {
            userId: decoded.sub as string,
            name: '',
            type: '',
            size: 0,
            employees: 0,
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            description: ''
        }
    });

    if (!createdStore) {
        throw new Error('Store not found');
    };
};