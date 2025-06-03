import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import {
    verify
} from 'jsonwebtoken';

import {
    PrismaClientSingleton
} from '../utils/prismaClient';

import {
    tokenService
} from './token.service';

import {
    ICheck,
    IForgotPassword,
    ILogin,
    ILogout,
    IRegister,
    IRegisterOnboarding,
    IResetPassword
} from '../types/auth';

export class AuthService extends PrismaClientSingleton {
    private static instance: AuthService;

    private constructor() {
        super();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(params: ILogin) {
        const auth = await this.prisma.auth.findUnique({
            where: { email: params.email },
            include: { user: true }
        });

        if (!auth || !auth.user) {
            throw new Error('User not found');
        };

        const passwordMatch = await bcrypt.compare(params.password, auth.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        };

        const token = await tokenService.generateToken(auth.user.id, params.rememberMe);

        await this.prisma.refreshToken.deleteMany({
            where: {
                userId: auth.user.id
            }
        });

        const refreshToken = await tokenService.generateRefreshToken(auth.user.id);

        await this.prisma.loginSession.create({
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
    }

    async logout(params: ILogout) {
        if (params.refreshToken) {
            try {
                await this.prisma.refreshToken.delete({
                    where: { id: params.refreshToken }
                });
            } catch (error) {
                console.error('Error deleting refresh token:', error);
            };
        };
    
        params.response.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    
        params.response.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    
        params.response.clearCookie('user_type', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return { message: 'Logged out successfully' };
    }

    async register(params: IRegister) {
        const authExists = await this.prisma.auth.findUnique({
            where: { email: params.email }
        });
        if (authExists) {
            throw new Error('User already exists');
        }

        const newUser = await this.prisma.user.create({
            data: {}
        });

        const passwordHash = await bcrypt.hash(params.password, 10);
        const newAuth = await this.prisma.auth.create({
            data: {
                email: params.email,
                password: passwordHash,
                type: params.type,
                userId: newUser.id
            }
        });

        const newProfile = await this.prisma.profile.create({
            data: {
                name: params.name,
                email: params.email,
                phoneNumber: '',
                photoUrl: '',
                bio: '',
                type: params.type,
                userId: newUser.id,
                dateOfBirth: ''
            }
        });

        await this.prisma.user.update({
            where: { id: newUser.id },
            data: {
                authId: newAuth.id,
                profileId: newProfile.id
            }
        });

        return { email: newAuth.email, name: newProfile.name, type: newAuth.type };
    };

    async registerOnboarding(params: IRegisterOnboarding) {
        const decoded = verify(params.token, process.env.JWT_SECRET as string) as {
            sub: string;
        };

        try {
            if (params.type === 'retailer') {
                await this.prisma.$transaction([
                    this.prisma.profile.updateMany({
                        where: {
                            userId: decoded.sub,
                            type: 'retailer'
                        },
                        data: {
                            photoUrl: '',
                            dateOfBirth: params.data.personalInfo.dateOfBirth,
                            phoneNumber: params.data.personalInfo.phoneNumber,
                            bio: params.data.personalInfo.bio,
                        }
                    }),
                    this.prisma.store.create({
                        data: {
                            name: params.data.storeInfo.name,
                            type: params.data.storeInfo.type,
                            size: Number(params.data.storeInfo.size),
                            employees: Number(params.data.storeInfo.employees),
                            address: params.data.storeInfo.address,
                            city: params.data.storeInfo.city,
                            state: params.data.storeInfo.state,
                            zipCode: params.data.storeInfo.zipCode,
                            country: params.data.storeInfo.country,
                            description: params.data.storeInfo.description,
                            userId: decoded.sub
                        }
                    }),
                    this.prisma.userPreferences.create({
                        data: {
                            language: params.data.preferencesInfo.language,
                            theme: params.data.preferencesInfo.theme,
                            dateFormat: params.data.preferencesInfo.dateFormat,
                            reduceMotion: false,
                            userId: decoded.sub as string
                        }
                    }),
                    this.prisma.userNotifications.create({
                        data: {
                            email_submision: true,
                            email_campaign: true,
                            email_rewards_and_points: true,
                            email_newsletter: true,
                            submission: true,
                            campaign: true,
                            rewards_and_points: true,
                            notification_frequency: params.data.preferencesInfo.notification,
                            userId: decoded.sub as string
                        }
                    })
                ]);
            } else if (params.type === 'industry') {
                console.log(params.data);
            };

            return { message: 'Onboarding registered successfully' };
        } catch (error: any) {
            throw new Error(error.message);
        };
    };

    async forgotPassword(params: IForgotPassword) {
        const auth = await this.prisma.auth.findUnique({
            where: { email: params.email }
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
            to: params.email,
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

    async resetPassword(params: IResetPassword) {
        try {
            const decoded = verify(params.token, process.env.JWT_SECRET as string) as {
                sub: string;
            };

            const user = await this.prisma.user.findUnique({
                where: { id: decoded.sub },
                include: { auth: true }
            });

            if (!user || !user.auth) {
                return { message: 'User not found' };
            };

            if (params.currentPassword) {
                const isMatch = await bcrypt.compare(params.currentPassword, user.auth.password);
                if (!isMatch) {
                    return { message: 'Current password is incorrect' };
                };
            };

            const passwordHash = await bcrypt.hash(params.password, 10);

            await this.prisma.auth.update({
                where: { id: user.auth.id },
                data: { password: passwordHash }
            });

            return { message: 'Password reset successfully' };
        } catch (error: any) {
            throw new Error(error.message);
        };
    };

    async check(params: ICheck) {
        if (!params.accessToken) {
            return { message: 'Not authenticated' };
        };

        const decoded = verify(params.accessToken, process.env.JWT_SECRET as string) as {
            sub: string;
        };

        const user = await this.prisma.user.findUnique({
            where: { id: decoded.sub },
            include: {
                auth: true
            },
        });

        if (!user || !user.auth) {
            return { message: 'User not found' };
        };

        return {
            id: user.id,
            type: user.auth.type
        };
    }
}

export const authService = AuthService.getInstance();