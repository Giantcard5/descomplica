import { 
    verify 
} from 'jsonwebtoken';

import { 
    prisma 
} from '../utils/prismaClient';

import {
    IProfile
} from '../types/profile';

export const getProfile = async (token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const profile = await prisma.profile.findUnique({
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
};

export const updateProfile = async (token: string, profile: IProfile) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const updatedProfile = await prisma.profile.update({
        where: {
            userId: decoded.sub as string
        },
        data: {
            ...profile
        }
    });

    if (!updatedProfile) {
        throw new Error('Profile not found');
    };
};