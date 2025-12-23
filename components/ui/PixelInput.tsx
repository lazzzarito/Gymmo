import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

const PixelInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, disabled, ...props }, ref) => {
        return (
            <input
                ref={ref}
                disabled={disabled}
                className={cn(
                    "w-full bg-surface border-4 border-black px-4 py-3",
                    "font-vt323 text-xl text-foreground placeholder:text-gray-500",
                    "focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_#ff4d4d]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-all duration-200",
                    className
                )}
                {...props}
            />
        );
    }
);
PixelInput.displayName = "PixelInput";

export { PixelInput };
