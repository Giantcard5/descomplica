import {
    Router,
    Request,
    Response
} from 'express';

import { 
    getProfile, 
    getStore,
    getNotifications,
    getSecurity,
    getPreferences
} from '../services/settings.service';

const router = Router();

router.get('/profile', async (request: Request, response: Response) => {
    const { 
        name, 
        email, 
        phoneNumber, 
        photoUrl, 
        bio 
    } = request.body;

    const profile = await getProfile({ 
        name, 
        email, 
        phoneNumber, 
        photoUrl, 
        bio 
    });

    return response.json({
        profile
    });
});

router.get('/store', async (request: Request, response: Response) => {
    const { 
        name, 
        type, 
        size, 
        employees, 
        address, 
        city, 
        state, 
        zipCode, 
        country, 
        description 
    } = request.body;

    const store = await getStore({ 
        name, 
        type, 
        size, 
        employees, 
        address, 
        city, 
        state, 
        zipCode, 
        country, 
        description
    });

    return response.json({
        store
    });
});

router.get('/notifications', async (request: Request, response: Response) => {
    const { 
        email_submision, 
        email_compaing, 
        email_rewards_and_points, 
        email_newsletter, 
        submission, 
        compaing, 
        rewards_and_points, 
        notification_frequency 
    } = request.body;

    const notifications = await getNotifications({ 
        email_submision, 
        email_compaing, 
        email_rewards_and_points, 
        email_newsletter, 
        submission, 
        compaing, 
        rewards_and_points, 
        notification_frequency 
    });

    return response.json({
        notifications
    });
});

router.get('/security', async (request: Request, response: Response) => {
    const { 
        current_password, 
        new_password, 
        confirm_password, 
        two_factor_authentication, 
        login_sessions 
    } = request.body;

    const security = await getSecurity({ 
        current_password, 
        new_password, 
        confirm_password, 
        two_factor_authentication, 
        login_sessions 
    });

    return response.json({
        security
    });
});

router.get('/preferences', async (request: Request, response: Response) => {
    const { 
        theme, 
        language, 
        dateFormat, 
        reduceMotion 
    } = request.body;

    const preferences = await getPreferences({ theme, language, dateFormat, reduceMotion });

    return response.json({
        preferences
    });
});

export const settingsRouter = router;