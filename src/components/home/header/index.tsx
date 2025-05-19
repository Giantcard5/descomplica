import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Descomplica Logo"
                        width={32}
                        height={32}
                        className="rounded"
                    />
                    <span className="text-xl font-bold">Descomplica</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="#features"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        How It Works
                    </Link>
                    <Link
                        href="#testimonials"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Testimonials
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Link href="/auth/login">
                        <Button variant="outline" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button size="sm">Register</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
