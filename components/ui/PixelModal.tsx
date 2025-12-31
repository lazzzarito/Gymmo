"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PixelCard } from "./PixelCard";
import { PixelButton } from "./PixelButton";
import { AnimatePresence, motion } from "framer-motion";

interface PixelModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function PixelModal({ isOpen, onClose, title, children }: PixelModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-lg relative"
                    >
                        <PixelCard className="bg-background border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6 pb-2 border-b-4 border-black/10">
                                <h2 className="font-press-start text-sm text-primary uppercase">{title}</h2>
                                <button onClick={onClose} className="hover:text-red-500 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="font-vt323 text-lg">
                                {children}
                            </div>
                        </PixelCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
