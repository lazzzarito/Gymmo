"use client";

import { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { useGameStore } from "@/lib/store";
import { Activity, Dumbbell, TrendingUp, Calendar, Sword, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PowerGraph } from "./PowerGraph";

export function HeroRecord() {
    const { stats, activityHistory, weightHistory, weight } = useGameStore();
    const [activeTab, setActiveTab] = useState<'stats' | 'campaign' | 'body'>('stats');

    // Stats
    const totalWorkouts = activityHistory.filter(a => a.type === 'workout').length;
    const totalQuests = activityHistory.filter(a => a.type === 'quest').length;

    // Weight Diff
    const initialWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : weight;
    const weightDiff = weight - initialWeight;

    return (
        <PixelCard className="bg-black/40 border-gray-800 p-0 overflow-hidden">
            {/* Header Tabs */}
            <div className="flex border-b-2 border-gray-800">
                <button
                    onClick={() => setActiveTab('stats')}
                    className={cn(
                        "flex-1 py-3 text-center font-press-start text-[8px] uppercase transition-colors border-r border-gray-800",
                        activeTab === 'stats' ? "bg-secondary text-black" : "text-gray-500 hover:text-white hover:bg-white/5"
                    )}
                >
                    ATRIBUTOS
                </button>
                <button
                    onClick={() => setActiveTab('campaign')}
                    className={cn(
                        "flex-1 py-3 text-center font-press-start text-[8px] uppercase transition-colors border-r border-gray-800",
                        activeTab === 'campaign' ? "bg-primary text-white" : "text-gray-500 hover:text-white hover:bg-white/5"
                    )}
                >
                    CAMPAÑA
                </button>
                <button
                    onClick={() => setActiveTab('body')}
                    className={cn(
                        "flex-1 py-3 text-center font-press-start text-[8px] uppercase transition-colors",
                        activeTab === 'body' ? "bg-blue-500 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"
                    )}
                >
                    FÍSICO
                </button>
            </div>

            {/* Content Area */}
            <div className="p-4 min-h-[250px] bg-black/20">
                {activeTab === 'stats' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Radar Chart Placeholder / Stat Bars */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-secondary/10 border border-secondary rounded flex items-center justify-center">
                                    <Sword className="w-5 h-5 text-secondary" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between font-press-start text-[10px] mb-1">
                                        <span className="text-secondary">FUERZA (STR)</span>
                                        <span className="text-white">{stats.str}</span>
                                    </div>
                                    <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary" style={{ width: `${Math.min(stats.str, 100)}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 border border-primary rounded flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between font-press-start text-[10px] mb-1">
                                        <span className="text-primary">RESISTENCIA (STA)</span>
                                        <span className="text-white">{stats.sta}</span>
                                    </div>
                                    <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${Math.min(stats.sta, 100)}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500 rounded flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between font-press-start text-[10px] mb-1">
                                        <span className="text-blue-500">VOLUNTAD (WILL)</span>
                                        <span className="text-white">{stats.will}</span>
                                    </div>
                                    <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${Math.min(stats.will, 100)}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-gray-900/50 border border-gray-700 rounded text-center">
                            <p className="font-vt323 text-gray-400 text-sm">Poder de Combate Total</p>
                            <p className="font-press-start text-xl text-white">{stats.str + stats.sta + stats.will}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'campaign' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-900/50 border border-gray-700 p-3 rounded text-center">
                                <Activity className="w-5 h-5 mx-auto mb-2 text-green-400" />
                                <div className="font-vt323 text-2xl text-white">{totalWorkouts}</div>
                                <div className="font-press-start text-[6px] text-gray-400 text-center">ENTRENOS</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-700 p-3 rounded text-center">
                                <Calendar className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                                <div className="font-vt323 text-2xl text-white">{totalQuests}</div>
                                <div className="font-press-start text-[6px] text-gray-400 text-center">MISIONES</div>
                            </div>
                        </div>

                        {/* Volume Graph */}
                        <div className="h-40">
                            <PowerGraph type="volume" />
                        </div>
                    </div>
                )}

                {activeTab === 'body' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center bg-gray-900/50 border border-gray-700 p-3 rounded">
                            <div>
                                <h3 className="font-press-start text-[10px] text-white mb-1 uppercase">Cambio Total</h3>
                                <p className="font-vt323 text-gray-400">Progreso desde el inicio</p>
                            </div>
                            <div className={cn("font-vt323 text-3xl", weightDiff <= 0 ? 'text-green-400' : 'text-red-400')}>
                                {weightDiff > 0 ? `+${weightDiff}` : weightDiff} <span className="text-sm">kg</span>
                            </div>
                        </div>

                        {/* Weight Graph */}
                        <div className="h-40">
                            <PowerGraph type="weight" />
                        </div>
                    </div>
                )}
            </div>
        </PixelCard>
    );
}
