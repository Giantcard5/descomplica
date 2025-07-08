'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './utils/schema';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useToast } from '@/hooks/use-toast';
import { usePreferences } from './hook/usePreferences';

export default function PreferencesSettingsPage() {
    const { toast } = useToast();
    const { handlePreferences } = usePreferences({
        onSuccess: (preferences) => reset(preferences),
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await handlePreferences(data);

            toast({
                title: response.message,
                description: response.status
                    ? 'Your preferences details have been updated'
                    : 'Your preferences details could not be updated',
                variant: response.status ? 'default' : 'destructive',
            });
        } catch (error) {
            console.error('Error updating preferences:', error);
            toast({
                title: 'Error',
                description: 'There was an issue updating your preferences details.',
                variant: 'destructive',
            });
        };
    });

    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle>App Preferences</CardTitle>
                    <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Language & Region</h3>
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select
                                value={watch('language')}
                                onValueChange={(value) => {
                                    setValue('language', value as 'en' | 'es' | 'pt_BR');
                                }}
                            >
                                <SelectTrigger id="language">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="pt_BR">Português</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.language && (
                                <p className="text-red-500 text-sm">{errors.language.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date-format">Date Format</Label>
                            <Select
                                value={watch('dateFormat')}
                                onValueChange={(value) => {
                                    setValue(
                                        'dateFormat',
                                        value as 'dd_mm_yyyy' | 'mm_dd_yyyy' | 'yyyy_mm_dd'
                                    );
                                }}
                            >
                                <SelectTrigger id="date-format">
                                    <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dd_mm_yyyy">DD/MM/YYYY</SelectItem>
                                    <SelectItem value="mm_dd_yyyy">MM/DD/YYYY</SelectItem>
                                    <SelectItem value="yyyy_mm_dd">YYYY/MM/DD</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.dateFormat && (
                                <p className="text-red-500 text-sm">{errors.dateFormat.message}</p>
                            )}
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Accessibility</h3>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="reduced-motion">Reduce Motion</Label>
                                <p className="text-sm text-muted-foreground">
                                    Minimize animations throughout the application
                                </p>
                            </div>
                            <Switch id="reduced-motion" {...register('reduceMotion')} />
                        </div>
                        {errors.reduceMotion && (
                            <p className="text-red-500 text-sm">{errors.reduceMotion.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" type="reset">
                        Reset to Defaults
                    </Button>
                    <Button type="submit">Save Preferences</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
