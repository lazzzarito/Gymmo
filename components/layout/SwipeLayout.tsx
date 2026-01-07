"use client";

import { useSwipeable } from "react-swipeable";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const ROUTES = ["/hub", "/routine", "/profile"];

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
        const currentIndex = ROUTES.indexOf(pathname);
        if (currentIndex === -1) return; // Not on a main tab

        let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

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
