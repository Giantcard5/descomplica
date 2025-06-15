import Link from 'next/link';
import Image from 'next/image';

import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Header() {
    return (
        <div className="flex h-16 items-center justify-between px-6 border-b">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Descomplica Logo"
                    width={32}
                    height={32}
                    className="rounded"
                />
                <span className="text-xl font-bold">Descomplica</span>
            </Link>
            <ModeToggle />
        </div>
    );
}
