"use client";

import { PixelModal } from "../ui/PixelModal";
import { PixelButton } from "../ui/PixelButton";
import { useGameStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QrCode, Camera, UserPlus, CheckCircle } from "lucide-react";

interface QRModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QRModal({ isOpen, onClose }: QRModalProps) {
    const { name, level, class: heroClass, addFriend } = useGameStore();
    const [mode, setMode] = useState<'my-code' | 'scanner'>('my-code');
    const [scanResult, setScanResult] = useState<string | null>(null);

    // My QR Data (Simplified ID)
    const myHeroData = JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        name,
        level,
        heroClass,
        isQR: true
    });

    useEffect(() => {
        if (mode === 'scanner' && isOpen) {
            const scanner = new Html5QrcodeScanner(
                "qr-reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            scanner.render((data) => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.isQR) {
                        setScanResult(parsed.name);
                        addFriend({
                            id: parsed.id,
                            name: parsed.name,
                            level: parsed.level,
                            heroClass: parsed.heroClass,
                            lastActive: new Date().toISOString(),
                            hasAura: false,
                            isOnline: true,
                            avatarSeed: parsed.name
                        });
                        scanner.clear();
                    }
                } catch (e) {
                    console.error("Invalid QR Code");
                }
            }, (error) => {
                // Ignore scanner errors
            });

            return () => {
                scanner.clear().catch(e => console.error(e));
            };
        }
    }, [mode, isOpen]);

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="CONEXIÓN HEROICA">
            <div className="space-y-6 flex flex-col items-center py-4">

                {/* Mode Selector */}
                <div className="flex bg-black/40 border-2 border-gray-800 p-1 rounded-sm w-full">
                    <button
                        onClick={() => { setMode('my-code'); setScanResult(null); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 font-press-start text-[8px] transition-all ${mode === 'my-code' ? 'bg-secondary text-black' : 'text-gray-500'}`}
                    >
                        <QrCode className="w-3 h-3" /> MI CÓDIGO
                    </button>
                    <button
                        onClick={() => { setMode('scanner'); setScanResult(null); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 font-press-start text-[8px] transition-all ${mode === 'scanner' ? 'bg-secondary text-black' : 'text-gray-500'}`}
                    >
                        <Camera className="w-3 h-3" /> ESCANEAR
                    </button>
                </div>

                {mode === 'my-code' ? (
                    <div className="bg-white p-4 border-[6px] border-black shadow-[8px_8px_0_rgba(0,0,0,0.5)] flex flex-col items-center">
                        <QRCodeSVG value={myHeroData} size={200} level="M" includeMargin={true} />
                        <div className="mt-4 text-center">
                            <h3 className="font-press-start text-[10px] text-black uppercase">{name}</h3>
                            <p className="font-vt323 text-gray-600 text-lg">Muestra este código para que te añadan</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        {scanResult ? (
                            <div className="text-center py-10 animate-bounce">
                                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                                <h3 className="font-press-start text-xs text-secondary">HÉROE AÑADIDO:</h3>
                                <p className="font-vt323 text-2xl text-white uppercase">{scanResult}</p>
                                <PixelButton onClick={() => setScanResult(null)} variant="primary" className="mt-6" size="sm">
                                    ESCANEAR OTRO
                                </PixelButton>
                            </div>
                        ) : (
                            <div id="qr-reader" className="w-full max-w-[300px] border-4 border-gray-800 bg-black" />
                        )}
                    </div>
                )}

                <p className="font-vt323 text-gray-500 text-sm italic text-center px-6">
                    "Las mejores amistades se forjan en el campo de batalla... en persona."
                </p>
            </div>
        </PixelModal>
    );
}
