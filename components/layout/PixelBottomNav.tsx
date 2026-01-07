"use client";

import { Home, Dumbbell, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function PixelBottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { id: "hub", label: "HUB", icon: Home, path: "/hub" },
        { id: "routine", label: "GRIMORIO", icon: Dumbbell, path: "/routine" },
        { id: "profile", label: "PERFIL", icon: User, path: "/profile" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-4 border-black p-2 pb-2 safe-area-bottom">
            <div className="max-w-md mx-auto grid grid-cols-3 gap-4 px-4">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <button
                            key={item.id}
                            onClick={() => router.push(item.path)}
                            className={cn(
                                "flex items-center justify-center gap-2 py-3 transition-all active:scale-95 rounded-lg border-2",
                                isActive
                                    ? "bg-secondary text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]"
                                    : "bg-surface border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-black" : "text-gray-500")} />
                            <span className={cn("font-press-start text-[10px] uppercase hidden sm:inline", isActive ? "text-black" : "text-gray-500")}>
                                {item.label}
                            </span>
                            {/* Mobile Label only for active or simple icon for inactive? Let's keep icon + label if it fits, or just icon on very small screens.

                            */}
                            <span className={cn("font-press-start text-[8px] uppercase sm:hidden leading-none", isActive ? "text-black" : "text-gray-500")}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
