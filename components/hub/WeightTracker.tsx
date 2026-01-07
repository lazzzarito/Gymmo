"use client";

import { PixelCard } from "../ui/PixelCard";
import { Scale } from "lucide-react";
import { useState } from "react";
import { PixelInput } from "../ui/PixelInput";
import { PixelButton } from "../ui/PixelButton";
import { useGameStore } from "@/lib/store";

export function WeightTracker() {
    const { weight: storeWeight, updateProfile } = useGameStore();
    const [editMode, setEditMode] = useState(false);
    const [weight, setWeight] = useState(storeWeight || 75);

    const handleSave = () => {
        updateProfile({ weight: Number(weight) });
        setEditMode(false);
    };

    return (
        <PixelCard className="p-4 bg-gray-900/50 border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-800 p-2 rounded border border-gray-600">
                        <Scale className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                        <h3 className="font-press-start text-[10px] text-gray-300 uppercase">Peso Actual</h3>
                        <p className="font-vt323 text-gray-500 text-xs">Registro Semanal</p>
                    </div>
                </div>

                {editMode ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="bg-black border-2 border-primary text-white font-press-start text-xs w-16 px-2 py-1 focus:outline-none"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            autoFocus
                        />
                        <button onClick={handleSave} className="bg-secondary text-black font-press-start text-[10px] px-2 py-1">OK</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setEditMode(true)}>
                        <span className="font-press-start text-xl text-secondary">{storeWeight || weight}</span>
                        <span className="font-vt323 text-gray-400">kg</span>
                    </div>
                )}
            </div>
        </PixelCard>
    );
}
