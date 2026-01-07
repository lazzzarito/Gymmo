"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PixelCard } from "./PixelCard";
import { AnimatePresence, motion } from "framer-motion";

interface PixelModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function PixelModal({ isOpen, onClose, title, children }: PixelModalProps) {
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
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full sm:max-w-lg relative pointer-events-auto"
                    >
                        <PixelCard className="bg-background border-white shadow-[0px_-4px_0px_0px_rgba(255,255,255,0.2)] max-h-[85vh] overflow-y-auto rounded-b-none sm:rounded-b-lg border-b-0 sm:border-b-4">
                            <div className="flex justify-between items-center mb-6 pb-2 border-b-4 border-black/10 sticky top-0 bg-background/95 backdrop-blur z-10 pt-2">
                                <h2 className="font-press-start text-sm text-primary uppercase">{title}</h2>
                                <button onClick={onClose} className="hover:text-red-500 transition-colors bg-black/10 p-1 rounded">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="font-vt323 text-lg pb-8 sm:pb-0">
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
