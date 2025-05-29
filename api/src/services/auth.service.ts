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

import { 
    createDefaultProfile,
    updateProfile,
} from './profile.service';
import { createDefaultStore, updateStore } from './store.service';
import { createDefaultUserNotifications, updateUserNotifications, updateUserPreferences } from './settings.service';
import { createDefaultUserPreferences } from './settings.service';

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

    const newProfile = await createDefaultProfile(user.type, user.email, newUser.id);

    await prisma.user.update({
        where: { id: newUser.id },
        data: {
            authId: newAuth.id,
            profileId: newProfile.id
        }
    });

    await createDefaultStore(newUser.id);
    await createDefaultUserNotifications(newUser.id);
    await createDefaultUserPreferences(newUser.id);

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

export const registerOnboarding = async (type: string, data: any, token: string) => {
    try {
        if (type === 'retailer') {
            // Update Profile
            // await updateProfile(token, {
            //     name: data.personalInfo.name,
            //     email: data.personalInfo.email,
            //     phoneNumber: data.personalInfo.phoneNumber,
            //     photoUrl: data.personalInfo.photoUrl,
            //     bio: data.personalInfo.bio,
            //     type: 'retailer',

            //     // Faz a chamada de update do prisma aqui, depois criamos uma funcao para isso
            // });
            // // Update Store
            // await updateStore(token, data.storeInfo);
            // // Update User Notifications
            // await updateUserNotifications(token, data.notifications);
            // // Update User Preferences
            // await updateUserPreferences(token, data.preferences);
        } else if (type === 'industry') {
            console.log(data);
        };
        
        return { message: 'Onboarding registered successfully' };
    } catch (error: any) {
        throw new Error(error.message);
    };
};