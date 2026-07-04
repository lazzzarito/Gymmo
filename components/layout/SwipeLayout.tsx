"use client";

import { useSwipeable } from "react-swipeable";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function SwipeLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNavigate('next'),
        onSwipedRight: () => handleNavigate('prev'),
        preventScrollOnSwipe: false,
        trackMouse: false,
        delta: 50
    });

    const handleNavigate = (direction: 'next' | 'prev') => {
        const currentIndex = ROUTES.indexOf(pathname as typeof ROUTES[number]);
        if (currentIndex === -1) return;

        const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex >= 0 && nextIndex < ROUTES.length) {
            router.push(ROUTES[nextIndex]);
        }
    };

    return (
        <div {...handlers} className="min-h-screen">
            {children}
        </div>
    );
}
