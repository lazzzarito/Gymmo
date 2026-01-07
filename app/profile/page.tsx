"use client";

import { useGameStore } from "@/lib/store";
import { PixelHeader } from "@/components/layout/PixelHeader";
import { PixelBottomNav } from "@/components/layout/PixelBottomNav";
import { PixelCard } from "@/components/ui/PixelCard";
import { User, Edit3, Ruler, Weight, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BiometricsModal } from "@/components/profile/BiometricsModal";
import { PixelButton } from "@/components/ui/PixelButton";
import { Sparkles as SparklesIcon } from "lucide-react";
import { HeroRecord } from "@/components/profile/HeroRecord";
import { TrophyRoom } from "@/components/profile/TrophyRoom";

import { ShareButton } from "@/components/ui/ShareButton";
import { useRef } from "react";

export default function ProfilePage() {
    const {
        name, class: heroClass, level, age, weight, height, streak
    } = useGameStore();
    const [isEditOpen, setIsEditOpen] = useState(false);

    // Ref for sharing
    const profileRef = useRef<HTMLDivElement>(null);

    const hasAura = streak >= 7;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <PixelHeader />
            <main className="pb-24 pt-24 px-4 max-w-md mx-auto space-y-6" ref={profileRef}>
                {/* Added ref to main container to capture everything, or just specific parts? 
                User asked: "share functionality... for daily challenges, routines, user stats".
                Capturing the whole profile view seems appropriate for "user stats".
            */}

                {/* Hero Card */}
                <PixelCard className={cn(
                    "relative bg-gradient-to-b border-secondary/50 text-center py-8 overflow-hidden transition-all duration-500",
                    hasAura ? "from-secondary/20 via-surface to-black shadow-[0_0_30px_rgba(255,200,0,0.1)]" : "from-surface to-black/60"
                )}>
                    {hasAura && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/40 to-transparent animate-pulse delay-75" />
                            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/40 to-transparent animate-pulse delay-150" />
                        </div>
                    )}

                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button onClick={() => setIsEditOpen(true)} className="p-2 bg-black/40 border border-gray-700 rounded-md hover:border-secondary transition-colors" title="Editar Perfil">
                            <Edit3 className="w-4 h-4 text-gray-400" />
                        </button>
                        <ShareButton targetRef={profileRef} fileName="gymmo-profile" className="p-2 h-auto" label="" />
                    </div>

                    <div className={cn(
                        "w-24 h-24 mx-auto bg-surface border-4 mb-4 flex items-center justify-center relative shadow-2xl transition-all duration-500",
                        hasAura ? "border-secondary animate-bounce-slow" : "border-secondary/30"
                    )}>
                        <User className={cn("w-12 h-12 transition-colors", hasAura ? "text-white" : "text-secondary")} />
                        <div className="absolute -bottom-2 -right-2 bg-secondary text-black font-press-start text-[10px] px-2 py-1 shadow-lg border border-white/20">
                            Lvl {level}
                        </div>
                        {hasAura && (
                            <div className="absolute -top-3 -left-3 animate-spin-slow">
                                <SparklesIcon className="w-6 h-6 text-secondary opacity-80" />
                            </div>
                        )}
                    </div>
                    <h1 className="font-press-start text-lg text-white mb-1 uppercase tracking-tight">{name}</h1>
                    <div className="flex items-center justify-center gap-2">
                        <p className="font-vt323 text-secondary text-xl capitalize tracking-widest">{heroClass}</p>
                        {hasAura && (
                            <span className="font-press-start text-[8px] text-yellow-400 animate-pulse">Aura: Disciplina</span>
                        )}
                    </div>
                </PixelCard>

                {/* Biometrics Bar */}
                <div className="grid grid-cols-3 gap-3">
                    <PixelCard className="bg-black/40 py-3 text-center border-gray-800 rounded-sm">
                        <Weight className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                        <div className="font-press-start text-[8px] text-gray-400 mb-1">PESO</div>
                        <div className="font-vt323 text-xl text-white">{weight}kg</div>
                    </PixelCard>
                    <PixelCard className="bg-black/40 py-3 text-center border-gray-800 rounded-sm">
                        <Ruler className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                        <div className="font-press-start text-[8px] text-gray-400 mb-1">ALTURA</div>
                        <div className="font-vt323 text-xl text-white">{height}cm</div>
                    </PixelCard>
                    <PixelCard className="bg-black/40 py-3 text-center border-gray-800 rounded-sm">
                        <Calendar className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                        <div className="font-press-start text-[8px] text-gray-400 mb-1">EDAD</div>
                        <div className="font-vt323 text-xl text-white">{age}a</div>
                    </PixelCard>
                </div>

                {/* Consolidated Hero Record */}
                <section>
                    <h2 className="font-press-start text-[10px] text-gray-500 mb-4 px-1 uppercase tracking-tighter flex items-center gap-2">
                        Registro del Héroe
                    </h2>
                    <HeroRecord />
                </section>

                {/* Trophy Room Section */}
                <section>
                    <h2 className="font-press-start text-[10px] text-gray-500 mb-4 px-1 uppercase tracking-tighter flex items-center gap-2">
                        Sala de Trofeos
                    </h2>
                    <TrophyRoom />
                </section>

            </main>
            <BiometricsModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
            <PixelBottomNav />
        </div>
    );
}
