import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function PreferencesSettingsLoading() {
    return (
        <div className="rounded-lg border border-border bg-card">
            <div className="p-6 border-b border-border">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-64 mt-2" />
            </div>
            <div className="p-6 space-y-6">
                {/* Appearance Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <Separator />

                {/* Language & Region */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-36" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <Separator />

                {/* Dashboard Preferences */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-44" />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-72" />
                        </div>
                        <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-80" />
                        </div>
                        <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                </div>

                <Separator />

                {/* Accessibility */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-28" />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-80" />
                        </div>
                        <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-72" />
                        </div>
                        <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                </div>
            </div>
            <div className="p-6 border-t border-border">
                <div className="flex justify-end gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-36" />
                </div>
            </div>
        </div>
    )
}
