import { Response } from 'express';

import { IOnboardingProfile } from './profile';
import { IOnboardingStore } from './store';
import { IOnboardingSettings } from './settings';

export interface ILogin {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export interface ILogout {
    refreshToken: string;
    response: Response;
};

export interface IRegister {
    name: string;
    email: string;
    password: string;
    type: 'retailer' | 'industry';
};

export interface IRegisterOnboarding {
    type: 'retailer' | 'industry';
    data: {
        personalInfo: IOnboardingProfile;
        storeInfo: IOnboardingStore;
        preferencesInfo: IOnboardingSettings;
    };
    token: string;
};

export interface IForgotPassword {
    email: string;
};

export interface IResetPassword {
    password: string;
    currentPassword: string;
    token: string;
};

export interface ICheck {
    accessToken: string;
};