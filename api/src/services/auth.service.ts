import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import {
    verify
} from 'jsonwebtoken';

import {
    prisma
} from '../utils/prismaClient';

import {
    generateRefreshToken,
    generateToken
} from './token.service';

import {
    IAuth
} from '../types/auth';

import { IOnboardingProfile } from '../types/profile';
import { IOnboardingStore } from '../types/store';
import { IOnboardingSettings } from '../types/settings';

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
    const auth = await prisma.auth.findUnique({
        where: { email },
        include: { user: true }
    });

    if (!auth || !auth.user) {
        throw new Error('User not found');
    };

    const passwordMatch = await bcrypt.compare(password, auth.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    };

    const token = await generateToken(auth.user.id);

    await prisma.refreshToken.deleteMany({
        where: {
            userId: auth.user.id
        }
    });

    const refreshToken = await generateRefreshToken(auth.user.id);

    await prisma.loginSession.create({
        data: {
            name: 'Iphone 15 Pro Max',
            type: 'mobile',
            address: '123 Main St, Anytown, USA',
            last_login: new Date().toISOString(),
            authId: auth.id
        }
    });

    return {
        token,
        refreshToken,
        type: auth.type
    };
};

export const registerUser = async (user: IAuth) => {
    const authExists = await prisma.auth.findUnique({
        where: { email: user.email }
    });
    if (authExists) {
        throw new Error('User already exists');
    }

    const newUser = await prisma.user.create({
        data: {}
    });

    const passwordHash = await bcrypt.hash(user.password, 10);
    const newAuth = await prisma.auth.create({
        data: {
            email: user.email,
            password: passwordHash,
            type: user.type,
            userId: newUser.id
        }
    });

    const newProfile = await prisma.profile.create({
        data: {
            name: user.name,
            email: user.email,
            phoneNumber: '',
            photoUrl: '',
            bio: '',
            type: user.type,
            userId: newUser.id,
            dateOfBirth: ''
        }
    });

    await prisma.user.update({
        where: { id: newUser.id },
        data: {
            authId: newAuth.id,
            profileId: newProfile.id
        }
    });

    return { email: newAuth.email, name: newProfile.name, type: newAuth.type };
};

export const forgotPassword = async (email: string) => {
    const auth = await prisma.auth.findUnique({
        where: { email }
    });

    if (!auth) {
        throw new Error('User not found');
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `Descomplica: <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Esqueceu sua senha?',
        text: 'Clique no link abaixo para resetar sua senha: ' + process.env.FRONTEND_URL + 'auth/reset-password?token='
    };

    try {
        await transporter.sendMail(mailOptions);
        return { message: 'Email sent successfully' };
    } catch (error: any) {
        throw new Error('Error sending email: ' + error.message);
    }
};

export const resetPassword = async (password: string, currentPassword: string, token: string) => {
    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as {
            sub: string;
        };

        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
            include: { auth: true }
        });

        if (!user || !user.auth) {
            return { message: 'User not found' };
        };

        if (currentPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.auth.password);
            if (!isMatch) {
                return { message: 'Current password is incorrect' };
            };
        };

        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.auth.update({
            where: { id: user.auth.id },
            data: { password: passwordHash }
        });

        return { message: 'Password reset successfully' };
    } catch (error: any) {
        throw new Error(error.message);
    };
};

export const registerOnboarding = async (type: string, data: {
    personalInfo: IOnboardingProfile;
    storeInfo: IOnboardingStore;
    preferencesInfo: IOnboardingSettings;
}, token: string) => {
    const decoded = verify(token, process.env.JWT_SECRET as string) as {
        sub: string;
    };

    try {
        if (type === 'retailer') {
            await prisma.$transaction([
                prisma.profile.updateMany({
                    where: {
                        userId: decoded.sub,
                        type: 'retailer'
                    },
                    data: {
                        photoUrl: '',
                        dateOfBirth: data.personalInfo.dateOfBirth,
                        phoneNumber: data.personalInfo.phoneNumber,
                        bio: data.personalInfo.bio,
                    }
                }),
                prisma.store.create({
                    data: {
                        name: data.storeInfo.name,
                        type: data.storeInfo.type,
                        size: Number(data.storeInfo.size),
                        employees: Number(data.storeInfo.employees),
                        address: data.storeInfo.address,
                        city: data.storeInfo.city,
                        state: data.storeInfo.state,
                        zipCode: data.storeInfo.zipCode,
                        country: data.storeInfo.country,
                        description: data.storeInfo.description,
                        userId: decoded.sub
                    }
                }),
                prisma.userPreferences.create({
                    data: {
                        language: data.preferencesInfo.language,
                        theme: data.preferencesInfo.theme,
                        dateFormat: data.preferencesInfo.dateFormat,
                        reduceMotion: false,
                        userId: decoded.sub as string
                    }
                }),
                prisma.userNotifications.create({
                    data: {
                        email_submision: false,
                        email_campaign: false,
                        email_rewards_and_points: false,
                        email_newsletter: false,
                        submission: false,
                        campaign: false,
                        rewards_and_points: false,
                        notification_frequency: data.preferencesInfo.notification,
                        userId: decoded.sub as string
                    }
                })
            ]);
        } else if (type === 'industry') {
            console.log(data);
        };

        return { message: 'Onboarding registered successfully' };
    } catch (error: any) {
        throw new Error(error.message);
    };
};