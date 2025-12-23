"use client";

import { useGameStore } from "@/lib/store";
import { getWeightSuggestions, WeightSuggestion } from "@/lib/generator";
import { PixelCard } from "@/components/ui/PixelCard";
import { Sparkles, ArrowUpCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export function OracleSuggestion() {
    const { activityHistory } = useGameStore();
    const [suggestions, setSuggestions] = useState<WeightSuggestion[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const result = getWeightSuggestions(activityHistory);
        setSuggestions(result);
    }, [activityHistory]);

    if (!isVisible || suggestions.length === 0) return null;

    const topSuggestion = suggestions[0];

    return (
        <PixelCard className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-400/50 p-4 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4">
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-white"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start">
                <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-400/50">
                    <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-press-start text-[8px] text-blue-300 uppercase tracking-widest">Consejo del Oráculo</h3>
                    <p className="font-vt323 text-lg text-white leading-tight">
                        Has dominado <span className="text-secondary">{topSuggestion.exerciseName}</span>.
                        El Oráculo sugiere subir a <span className="text-green-400">{topSuggestion.suggestedWeight}kg</span>.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                        <ArrowUpCircle className="w-3 h-3 text-green-400" />
                        <span className="font-press-start text-[6px] text-gray-400">PODER RECOMENDADO</span>
                    </div>
                </div>
            </div>

            {/* Background sparkle effect */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
        </PixelCard>
    );
}
