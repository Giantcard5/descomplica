export interface IProfile {
    name: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    bio: string;
    type: 'retailer' | 'industry';
};

export interface IOnboardingProfile {
    bio: string;
    dateOfBirth: string;
    phoneNumber: string;
};

export interface IUpdate {
    token: string;
    profile: {
        name: string;
        phoneNumber: string;
        bio: string;
        photoUrl: string;
    };
};