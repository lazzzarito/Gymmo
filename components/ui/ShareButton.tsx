"use client";

import { toPng } from 'html-to-image';
import { PixelButton } from './PixelButton';
import { Share2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { ShareCardLayout } from './ShareCardLayout';

interface ShareButtonProps {
    targetRef?: any;
    fileName?: string;
    label?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    className?: string;
}

export function ShareButton({ fileName = 'gymmo-share', label = 'COMPARTIR', variant = 'outline', className }: ShareButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (!cardRef.current) return;
        setIsLoading(true);

        try {
            // Wait a tick for render if hidden
            await new Promise(resolve => setTimeout(resolve, 100));

            const dataUrl = await toPng(cardRef.current, { cacheBust: true, backgroundColor: '#000000', pixelRatio: 2 });

            // Convert to Blob
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], `${fileName}.png`, { type: 'image/png' });

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Gymmo Status',
                        text: '¡Mira mi progreso en Gymmo! 💪⚔️ #GymmoRPG',
                        files: [file]
                    });
                } catch (shareError) {
                    console.log('Share canceled or failed', shareError);
                }
            } else {
                const link = document.createElement('a');
                link.download = `${fileName}.png`;
                link.href = dataUrl;
                link.click();
            }

        } catch (err) {
            console.error('Error capture:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ShareCardLayout ref={cardRef} />
            <PixelButton onClick={handleShare} variant={variant} className={className} disabled={isLoading}>
                {isLoading ? (
                    <span className="animate-pulse">...</span>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline">{label}</span>
                    </div>
                )}
            </PixelButton>
        </>
    );
}
