import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function ProfileSettingsLoading() {
    return (
        <div className='space-y-8'>
            <div className='space-y-2'>
                <Skeleton className='h-7 w-48' />
                <Skeleton className='h-4 w-64' />
            </div>

            <div className='space-y-6'>
                <div className='flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0'>
                    <Skeleton className='h-24 w-24 rounded-full' />
                    <div className='space-y-2'>
                        <Skeleton className='h-6 w-32' />
                        <Skeleton className='h-4 w-80' />
                        <div className='flex gap-2'>
                            <Skeleton className='h-8 w-20' />
                            <Skeleton className='h-8 w-20' />
                        </div>
                    </div>
                </div>

                <Separator />

                <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-20' />
                        <Skeleton className='h-10 w-full' />
                    </div>
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-12' />
                        <Skeleton className='h-10 w-full' />
                    </div>
                </div>

                <div className='space-y-2'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-10 w-full' />
                </div>

                <div className='space-y-2'>
                    <Skeleton className='h-4 w-8' />
                    <Skeleton className='h-20 w-full' />
                </div>

                <div className='flex justify-end gap-2'>
                    <Skeleton className='h-10 w-20' />
                    <Skeleton className='h-10 w-32' />
                </div>
            </div>
        </div>
    );
};