import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function SecuritySettingsLoading() {
    return (
        <div className="rounded-lg border border-border bg-card">
            <div className="p-6 border-b border-border">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-56 mt-2" />
            </div>
            <div className="p-6 space-y-6">
                {/* Change Password Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-36" />
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-36" />
                    </div>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-52" />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Skeleton className="h-4 w-60" />
                            <Skeleton className="h-3 w-80" />
                        </div>
                        <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-72" />
                </div>

                <Separator />

                {/* API Access */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-64" />
                        </div>
                        <Skeleton className="h-6 w-11 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>

                <Separator />

                {/* Login Sessions */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <div className="rounded-md border border-border">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`p-4 ${i < 3 ? "border-b border-border" : ""}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-3 w-48 mt-1" />
                                    </div>
                                    <Skeleton className="h-8 w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
};