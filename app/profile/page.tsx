"use client";

import { useGameStore } from "@/lib/store";
import { PixelHeader } from "@/components/layout/PixelHeader";
import { PixelBottomNav } from "@/components/layout/PixelBottomNav";
import { StatsCard } from "@/components/profile/StatsCard";
import { PixelCard } from "@/components/ui/PixelCard";
import { User, Activity, TrendingUp, Edit3, Ruler, Weight, Calendar, Trophy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BiometricsModal } from "@/components/profile/BiometricsModal";
import { SkillTreeModal } from "@/components/profile/SkillTreeModal";
import { PowerGraph } from "@/components/profile/PowerGraph";
import { PixelButton } from "@/components/ui/PixelButton";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { Sparkles as SparklesIcon } from "lucide-react";

export default function ProfilePage() {
    const {
        name, class: heroClass, level, age, weight, height,
        activityHistory, weightHistory, unlockedAchievementIds, streak
    } = useGameStore();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSkillTreeOpen, setIsSkillTreeOpen] = useState(false);
    const [activeTier, setActiveTier] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Beginner');

    const hasAura = streak >= 7;

    // Calculate stats
    const totalWorkouts = activityHistory.filter(a => a.type === 'workout').length;
    const totalQuests = activityHistory.filter(a => a.type === 'quest').length;

    const initialWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : weight;
    const weightDiff = weight - initialWeight;

    const unlockedAchievements = ACHIEVEMENTS.filter(ach => (unlockedAchievementIds || []).includes(ach.id));

    return (
        <div className="min-h-screen bg-background text-foreground">
            <PixelHeader />
            <main className="pb-24 pt-24 px-4 max-w-md mx-auto space-y-6">

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
                        <button onClick={() => setIsSkillTreeOpen(true)} className="p-2 bg-black/40 border border-secondary/40 rounded-md hover:bg-secondary/20 transition-all group" title="Árbol de Habilidades">
                            <SparklesIcon className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                        </button>
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

                {/* Attributes Section */}
                <section>
                    <h2 className="font-press-start text-[10px] text-gray-500 mb-4 px-1 uppercase tracking-tighter flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Atributos de Combate
                    </h2>
                    <StatsCard />
                </section>

                {/* Progress Stats */}
                <section className="space-y-4">
                    <h2 className="font-press-start text-[10px] text-gray-500 mb-4 px-1 uppercase tracking-tighter flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" /> Progreso de Campaña
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <PixelCard className="bg-black/20 border-gray-800 p-4">
                            <h3 className="font-press-start text-[8px] text-secondary mb-2">MAZMORRAS</h3>
                            <div className="font-vt323 text-3xl text-white">{totalWorkouts}</div>
                            <p className="text-[10px] text-gray-500 font-press-start uppercase mt-1">Completadas</p>
                        </PixelCard>
                        <PixelCard className="bg-black/20 border-gray-800 p-4">
                            <h3 className="font-press-start text-[8px] text-primary mb-2">MISIONES</h3>
                            <div className="font-vt323 text-3xl text-white">{totalQuests}</div>
                            <p className="text-[10px] text-gray-500 font-press-start uppercase mt-1">Finalizadas</p>
                        </PixelCard>
                    </div>

                    {/* Graphs of Power */}
                    <div className="grid grid-cols-1 gap-4">
                        <PowerGraph type="weight" />
                        <PowerGraph type="volume" />
                    </div>

                    <PixelCard className="bg-surface/30 border-gray-700 p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-press-start text-[10px] text-white mb-1 uppercase">Evolución Corporal</h3>
                                <p className="font-vt323 text-gray-400">Variación de peso total</p>
                            </div>
                            <div className={`font-vt323 text-3xl ${weightDiff <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {weightDiff > 0 ? `+${weightDiff}` : weightDiff} <span className="text-sm">kg</span>
                            </div>
                        </div>
                    </PixelCard>
                </section>

                {/* Recent Activity List */}
                {activityHistory.length > 0 && (
                    <section>
                        <h2 className="font-press-start text-[10px] text-gray-500 mb-4 px-1 uppercase tracking-tighter">Historial Reciente</h2>
                        <div className="space-y-3">
                            {activityHistory.slice(0, 3).map((log) => (
                                <PixelCard key={log.id} className="flex items-center justify-between py-3 px-4 bg-black/40 border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded bg-black/60 border ${log.type === 'workout' ? 'border-secondary text-secondary' : 'border-primary text-primary'}`}>
                                            {log.type === 'workout' ? <Activity className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <div className="font-vt323 text-lg text-white leading-none">{log.title}</div>
                                            <div className="font-press-start text-[8px] text-gray-500 mt-1">
                                                {new Date(log.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="font-vt323 text-yellow-400">
                                        +{log.xpEarned} XP
                                    </div>
                                </PixelCard>
                            ))}
                        </div>
                    </section>
                )}

                {/* Trophy Room (At the bottom) */}
                <section className="pt-6 border-t border-gray-800 space-y-6 overflow-hidden">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-3 h-3 text-yellow-400" />
                            <h2 className="font-press-start text-[10px] text-gray-500 uppercase tracking-tighter">Salón de Trofeos</h2>
                        </div>
                        <span className="font-vt323 text-gray-500 text-lg">
                            {unlockedAchievements.length} / {ACHIEVEMENTS.length}
                        </span>
                    </div>

                    {/* Tier Tabs */}
                    <div className="flex bg-black/40 border border-gray-800 rounded-sm">
                        {(['Beginner', 'Intermediate', 'Expert'] as const).map((tier) => (
                            <button
                                key={tier}
                                onClick={() => setActiveTier(tier)}
                                className={cn(
                                    "flex-1 font-press-start text-[8px] py-3 transition-all truncate px-1",
                                    activeTier === tier
                                        ? "bg-secondary text-black"
                                        : "text-gray-500 hover:text-white"
                                )}
                            >
                                {tier === 'Beginner' ? 'NOVATO' : tier === 'Intermediate' ? 'GUERRERO' : 'DEIDAD'}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 px-1">
                        {ACHIEVEMENTS.filter(a => a.tier === activeTier).map((ach, idx) => {
                            const isUnlocked = (unlockedAchievementIds || []).includes(ach.id);
                            // Determine tooltip side to prevent overflow
                            const isRightSide = (idx + 1) % 4 === 0 || (idx + 1) % 4 === 3;

                            return (
                                <div
                                    key={ach.id}
                                    className={cn(
                                        "aspect-square border-2 flex items-center justify-center relative group transition-all duration-300",
                                        isUnlocked
                                            ? "border-yellow-500 bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                                            : "border-gray-800 bg-black/40 grayscale opacity-40 hover:opacity-100"
                                    )}
                                >
                                    <span className="text-xl sm:text-2xl">{isUnlocked ? ach.icon : '❓'}</span>

                                    {/* Tooltip */}
                                    <div className={cn(
                                        "absolute bottom-full mb-2 w-32 sm:w-40 bg-black border border-gray-700 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl",
                                        isRightSide ? "right-0" : "left-0"
                                    )}>
                                        <div className="font-press-start text-[6px] text-white leading-tight mb-1 underline">{ach.title}</div>
                                        <div className="font-vt323 text-[10px] text-gray-400 leading-tight">{ach.description}</div>
                                        {!isUnlocked && (
                                            <div className="mt-1 font-press-start text-[5px] text-red-500">BLOQUEADO</div>
                                        )}
                                    </div>

                                    {isUnlocked && (
                                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-sm" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {unlockedAchievements.length === 0 && (
                        <p className="font-vt323 text-gray-500 text-center italic text-sm">Empieza tu leyenda para desbloquear equipo.</p>
                    )}
                </section>

            </main>
            <BiometricsModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
            <SkillTreeModal
                isOpen={isSkillTreeOpen}
                onClose={() => setIsSkillTreeOpen(false)}
            />

            <PixelBottomNav />
        </div>
    );
}
