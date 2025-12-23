"use client";

import { useGameStore } from "@/lib/store";
import { PixelCard } from "../ui/PixelCard";
import { cn } from "@/lib/utils";

interface PowerGraphProps {
    type: 'weight' | 'volume';
}

export function PowerGraph({ type }: PowerGraphProps) {
    const { weightHistory, activityHistory } = useGameStore();

    // Mock data for initial visualization if history is short
    const getChartData = () => {
        if (type === 'weight') {
            const data = weightHistory.length > 3
                ? weightHistory.slice(-7)
                : [
                    { date: 'L', weight: 80 },
                    { date: 'M', weight: 79.5 },
                    { date: 'X', weight: 79.8 },
                    { date: 'J', weight: 79.2 },
                    { date: 'V', weight: 78.9 },
                ];
            return data.map(d => ({ label: d.date.slice(-1), value: d.weight }));
        } else {
            // Calculate daily volume (sets * reps * weight)
            const data = activityHistory.length > 3
                ? activityHistory.slice(-7).map(log => ({
                    label: new Date(log.date).toLocaleDateString('es-ES', { weekday: 'short' })[0],
                    value: log.exercises?.reduce((acc, ex) => acc + (ex.config.sets * ex.config.reps * (ex.config.weight || 1)), 0) || 100
                }))
                : [
                    { label: 'L', value: 1200 },
                    { label: 'M', value: 1500 },
                    { label: 'X', value: 800 },
                    { label: 'J', value: 2100 },
                    { label: 'V', value: 1900 },
                ];
            return data;
        }
    };

    const chartData = getChartData();
    const maxVal = Math.max(...chartData.map(d => d.value)) || 1;
    const minVal = Math.min(...chartData.map(d => d.value)) || 0;

    return (
        <PixelCard className="p-4 bg-black/40 border-gray-800 relative overflow-hidden h-48 flex flex-col justify-end">
            <div className="absolute top-2 left-2 font-press-start text-[6px] text-gray-500 uppercase">
                {type === 'weight' ? 'Evolución Peso' : 'Volumen Semanal'}
            </div>

            <div className="flex items-baseline justify-between gap-1 h-32 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                </div>

                {chartData.map((d, i) => {
                    // Calculate height percentage
                    let height;
                    if (type === 'weight') {
                        // For weight, we want to see the fluctuation relative to min/max
                        const range = maxVal - minVal || 1;
                        height = ((d.value - (minVal * 0.95)) / (maxVal - (minVal * 0.95))) * 100;
                    } else {
                        height = (d.value / maxVal) * 100;
                    }

                    return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                            {/* The Bar */}
                            <div
                                className={cn(
                                    "w-full max-w-[12px] transition-all duration-700 ease-out border-x border-t",
                                    type === 'weight' ? "bg-blue-900/40 border-blue-500" : "bg-secondary/40 border-secondary"
                                )}
                                style={{ height: `${Math.max(10, height)}%` }}
                            >
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-white text-black font-vt323 text-[10px] px-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {d.value}{type === 'weight' ? 'kg' : ''}
                                </div>
                            </div>
                            <span className="font-press-start text-[6px] text-gray-600 mt-2">{d.label}</span>
                        </div>
                    );
                })}
            </div>
        </PixelCard>
    );
}
