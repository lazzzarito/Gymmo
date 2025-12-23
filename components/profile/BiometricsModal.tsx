"use client";

import { useState } from "react";
import { PixelModal } from "@/components/ui/PixelModal";
import { useGameStore } from "@/lib/store";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { User, Ruler, Weight, Calendar, VenusAndMars } from "lucide-react";

interface BiometricsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BiometricsModal({ isOpen, onClose }: BiometricsModalProps) {
    const { name, gender, age, weight, height, updateProfile, updateWeight } = useGameStore();

    const [form, setForm] = useState({
        name,
        gender,
        age,
        weight,
        height,
    });

    const handleSave = () => {
        // Update general profile
        updateProfile({
            name: form.name,
            gender: form.gender as any,
            age: Number(form.age),
            height: Number(form.height),
            weight: Number(form.weight) // This updates the store value
        });

        // Specifically log weight change for history
        if (Number(form.weight) !== weight) {
            updateWeight(Number(form.weight));
        }

        onClose();
    };

    const inputClasses = "w-full bg-black/40 border-2 border-gray-800 p-2 font-vt323 text-lg text-white focus:border-secondary outline-none";

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="EDITAR PERFIL">
            <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                    <label className="font-press-start text-[8px] text-gray-500 uppercase flex items-center gap-2">
                        <User className="w-3 h-3" /> Nombre de Héroe
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClasses}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Gender */}
                    <div className="space-y-1">
                        <label className="font-press-start text-[8px] text-gray-500 uppercase flex items-center gap-2">
                            <VenusAndMars className="w-3 h-3" /> Género
                        </label>
                        <select
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                            className={inputClasses}
                        >
                            <option value="">Seleccionar</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div className="space-y-1">
                        <label className="font-press-start text-[8px] text-gray-500 uppercase flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> Edad
                        </label>
                        <input
                            type="number"
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Weight */}
                    <div className="space-y-1">
                        <label className="font-press-start text-[8px] text-gray-500 uppercase flex items-center gap-2">
                            <Weight className="w-3 h-3" /> Peso (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={form.weight}
                            onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                            className={inputClasses}
                        />
                    </div>

                    {/* Height */}
                    <div className="space-y-1">
                        <label className="font-press-start text-[8px] text-gray-500 uppercase flex items-center gap-2">
                            <Ruler className="w-3 h-3" /> Altura (cm)
                        </label>
                        <input
                            type="number"
                            value={form.height}
                            onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <PixelButton onClick={handleSave} className="w-full" variant="primary">
                        GUARDAR CAMBIOS
                    </PixelButton>
                </div>
            </div>
        </PixelModal>
    );
}
