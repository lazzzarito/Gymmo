
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface PixelButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "danger";
    size?: "sm" | "md" | "lg";
}

const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-primary text-black",
            secondary: "bg-secondary text-black",
            outline: "bg-transparent border-white text-white",
            danger: "bg-red-600 text-white",
        };

        const sizes = {
            sm: "px-3 py-1 text-[10px]",
            md: "px-6 py-3 text-sm",
            lg: "px-8 py-4 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "px-6 py-3 font-press-start text-sm uppercase tracking-wider relative",
                    "border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
                    "transition-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                onClick={(e) => {
                    playSfx('click');
                    props.onClick?.(e);
                }}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
PixelButton.displayName = "PixelButton";

export { PixelButton };
