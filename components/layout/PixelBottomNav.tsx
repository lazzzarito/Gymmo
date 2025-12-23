"use client";

import { Home, Users, Dumbbell, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function PixelBottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { id: "hub", label: "HUB", icon: Home, path: "/hub" },
        { id: "routine", label: "RUTINA", icon: Dumbbell, path: "/routine" },
        { id: "community", label: "SOCIAL", icon: Users, path: "/community" },
        { id: "profile", label: "PERFIL", icon: User, path: "/profile" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-4 border-black p-2">
            <div className="max-w-md mx-auto grid grid-cols-4 gap-2">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    return (
                        <button
                            key={item.id}
                            onClick={() => router.push(item.path)}
                            className={cn(
                                "flex flex-col items-center justify-center py-2 transition-transform active:scale-95 rounded-lg",
                                isActive ? "bg-white/5 text-primary" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 mb-1", isActive && "text-primary")} />
                            <span className={cn("font-press-start text-[8px] uppercase", isActive ? "text-primary" : "text-gray-500")}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
