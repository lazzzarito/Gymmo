import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
    ({ className, children, noPadding = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-surface border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]",
                    "relative overflow-hidden",
                    !noPadding && "p-6",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
PixelCard.displayName = "PixelCard";

export { PixelCard };
