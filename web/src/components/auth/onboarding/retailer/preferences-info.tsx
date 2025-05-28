'use client';

import React from 'react';

import { UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { RetailerFormSchema } from '@/app/auth/onboarding/(utils)/schema';

interface IPreferencesInfo {
    watch: UseFormWatch<RetailerFormSchema>;
    setValue: UseFormSetValue<RetailerFormSchema>;
    errors: FieldErrors<RetailerFormSchema>;
};

export function PreferencesInfo({ watch, setValue, errors }: IPreferencesInfo) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Preferences & Settings</h2>
                <p className="text-sm text-muted-foreground">
                    Set your preferences to customize your experience.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={watch('preferencesTheme')} onValueChange={(value) => {
                        setValue('preferencesTheme', value as 'light' | 'dark' | 'system');
                    }}>
                        <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.preferencesTheme && (
                        <p className="text-red-500 text-sm">{errors.preferencesTheme.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select value={watch('preferencesLanguage')} onValueChange={(value) => {
                        setValue('preferencesLanguage', value as 'en' | 'es' | 'pt-BR');
                    }}>
                        <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="pt-BR">Português</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.preferencesLanguage && (
                        <p className="text-red-500 text-sm">{errors.preferencesLanguage.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select value={watch('preferencesDateFormat')} onValueChange={(value) => {
                        setValue('preferencesDateFormat', value as 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd');
                    }}>
                        <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dd_mm_yyyy">dd/mm/yyyy</SelectItem>
                            <SelectItem value="mm_dd_yyyy">mm/dd/yyyy</SelectItem>
                            <SelectItem value="yyyy_mm_dd">yyyy/mm/dd</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.preferencesDateFormat && (
                        <p className="text-red-500 text-sm">{errors.preferencesDateFormat.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notification-preferences">
                        Notification Preferences
                    </Label>
                    <Select value={watch('preferencesNotification')} onValueChange={(value) => {
                        setValue('preferencesNotification', value as 'real-time' | 'daily' | 'weekly' | 'never');
                    }}>
                        <SelectTrigger id="notification-preferences">
                            <SelectValue placeholder="Select notification preferences" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="real-time">Real-Time</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.preferencesNotification && (
                        <p className="text-red-500 text-sm">{errors.preferencesNotification.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
};