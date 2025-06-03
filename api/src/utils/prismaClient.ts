import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export class PrismaClientSingleton {
    public readonly prisma: PrismaClient;

    public constructor() {
        this.prisma = new PrismaClient();
    };
};