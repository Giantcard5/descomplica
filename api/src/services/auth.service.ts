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
    IAuthUser
} from '../types/authUser';

export const registerUser = async (user: IAuthUser) => {
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    if (userExists) {
        throw new Error('User already exists');
    };

    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: passwordHash,
            type: user.type
        }
    });

    return newUser;
};

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (!userExists) {
        throw new Error('User not found');
    };

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
        throw new Error('Invalid password');
    };

    const token = await generateToken(userExists.id);

    await prisma.refreshToken.deleteMany({
        where: {
            userId: userExists.id
        }
    });

    const refreshToken = await generateRefreshToken(userExists.id);

    return { token, refreshToken, type: userExists.type };
};

export const forgotPassword = async (email: string) => {
    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (!userExists) {
        throw new Error('User not found');
    };

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
        text: 'Clique no link abaixo para resetar sua senha: ' + process.env.FRONTEND_URL + 'auth/reset-password?token=' // Create a token to reset the password
    };

    try {
        await transporter.sendMail(mailOptions);

        return { message: 'Email sent successfully' };
    } catch (error: any) {
        throw new Error('Error sending email: ' + error.message);
    };
};

export const resetPassword = async (password: string, currentPassword: string, token: string) => {
    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as {
            sub: string;
        };

        const userExists = await prisma.user.findUnique({
            where: { id: decoded.sub }
        });

        if (!userExists) {
            throw new Error('User not found');
        };

        if (currentPassword) {
            const isMatch = await bcrypt.compare(currentPassword, userExists.password);
            if (!isMatch) {
                throw new Error('Current password is incorrect');
            };
        };

        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: userExists.id },
            data: { password: passwordHash }
        });

        return { message: 'Password reset successfully' };
    } catch (error: any) {
        throw new Error('Invalid token');
    };
};