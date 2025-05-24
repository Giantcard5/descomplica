import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function NotificationSettingsLoading() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-72" />
            </div>

            <div className="space-y-6">
                {/* Email Notifications Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                    <Skeleton className="h-6 w-11 rounded-full" />
                                </div>
                                {i < 4 && <Separator className="mt-3" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Push Notifications Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-36" />
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Skeleton className="h-4 w-36" />
                                        <Skeleton className="h-3 w-72" />
                                    </div>
                                    <Skeleton className="h-6 w-11 rounded-full" />
                                </div>
                                {i < 3 && <Separator className="mt-3" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notification Frequency */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-44" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-36" />
                </div>
            </div>
        </div>
    )
}
