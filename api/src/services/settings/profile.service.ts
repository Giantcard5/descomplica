import {
    verify
} from 'jsonwebtoken';

import {
    PrismaClientSingleton
} from '../../utils/prismaClient';

import { 
    IUpdate 
} from '../../types/profile';

export class ProfileService extends PrismaClientSingleton {
    private static instance: ProfileService;

    private constructor() {
        super();
    }

    static getInstance(): ProfileService {
        if (!ProfileService.instance) {
            ProfileService.instance = new ProfileService();
        }
        return ProfileService.instance;
    }
    
    async get(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);
    
        const profile = await this.prisma.profile.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!profile) {
            throw new Error('Profile not found');
        };
    
        return {
            name: profile.name,
            email: profile.email,
            phoneNumber: profile.phoneNumber,
            photoUrl: profile.photoUrl,
            bio: profile.bio,
            type: profile.type
        };
    }

    async update(params: IUpdate) {
        const decoded = verify(params.token, process.env.JWT_SECRET as string);
    
        const currentProfile = await this.prisma.profile.findUnique({
            where: { userId: decoded.sub as string }
        });
    
        if (!currentProfile) {
            throw new Error('Profile not found');
        };
    
        const changedFields: Partial<typeof params.profile> = {};
        for (const key of Object.keys(params.profile) as (keyof typeof params.profile)[]) {
            if (params.profile[key] !== currentProfile[key]) {
                changedFields[key] = params.profile[key];
            }
        }
    
        if (Object.keys(changedFields).length === 0) {
            return {
                message: 'Profile update failed',
                status: false
            };
        };
    
        await this.prisma.profile.update({
            where: { userId: decoded.sub as string },
            data: changedFields
        });
    
        return {
            message: 'Profile updated successfully',
            status: true
        };
    };
}

export const profileService = ProfileService.getInstance();