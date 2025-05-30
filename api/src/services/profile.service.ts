import {
    verify
} from 'jsonwebtoken';

import {
    prisma
} from '../utils/prismaClient';

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

export const updateProfile = async (token: string, profile: {
    name: string;
    phoneNumber: string;
    bio: string;
    photoUrl: string;
}) => {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const currentProfile = await prisma.profile.findUnique({
        where: { userId: decoded.sub as string }
    });

    if (!currentProfile) {
        throw new Error('Profile not found');
    };

    const changedFields: Partial<typeof profile> = {};
    for (const key of Object.keys(profile) as (keyof typeof profile)[]) {
        if (profile[key] !== currentProfile[key]) {
            changedFields[key] = profile[key];
        }
    }

    if (Object.keys(changedFields).length === 0) {
        return {
            message: 'Profile update failed',
            status: false
        };
    };

    await prisma.profile.update({
        where: { userId: decoded.sub as string },
        data: changedFields
    });

    return {
        message: 'Profile updated successfully',
        status: true
    };
};