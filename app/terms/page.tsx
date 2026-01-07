"use client";

import { PixelHeader } from "@/components/layout/PixelHeader";
import { PixelBottomNav } from "@/components/layout/PixelBottomNav";
import { PixelCard } from "@/components/ui/PixelCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PixelHeader />
            <main className="pb-24 pt-24 px-4 max-w-md mx-auto space-y-6">
                <Link href="/hub" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-vt323 text-lg">
                    <ChevronLeft className="w-5 h-5" /> Volver al Hub
                </Link>

                <PixelCard className="p-6">
                    <h1 className="font-press-start text-sm text-secondary mb-6 lowercase">TÉRMINOS DE SERVICIO</h1>
                    <div className="font-vt323 text-lg text-gray-300 space-y-6">
                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">1. ACEPTACIÓN DE LA MISIÓN</h2>
                            <p>Al iniciar tu aventura en Gymmo, aceptas estos términos como un pacto vinculante. Gymmo es una herramienta de gamificación (juego) diseñada para motivar el ejercicio físico, pero no sustituye el juicio profesional.</p>
                        </section>

                        <section className="bg-red-900/20 border border-red-500/50 p-2 rounded">
                            <h2 className="text-red-400 font-bold text-xl mb-1">2. EXENCIÓN DE RESPONSABILIDAD DE SALUD</h2>
                            <p className="text-white"><strong>¡ADVERTENCIA!</strong> El uso de esta aplicación implica actividad física vigorosa. Gymmo <strong>NO</strong> es un entrenador personal certificado ni un médico.</p>
                            <p className="mt-2 text-white">Tú eres el único responsable de asegurar que tu técnica sea correcta para evitar lesiones (debuffs permanentes en la vida real). Consulta a un profesional de la salud antes de comenzar cualquier régimen de entrenamiento, especialmente si tienes condiciones preexistentes.</p>
                        </section>

                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">3. CÓDIGO DE HONOR (FAIR PLAY)</h2>
                            <p>Gymmo se basa en la honestidad. Registrar repeticiones o pesos que no has levantado (Cheat Reps) no solo engaña a la aplicación, sino que sabotea tu propio progreso real. Nos reservamos el derecho de no validar logros que parezcan físicamente imposibles para un humano (ej: 500kg en Curl de Bíceps).</p>
                        </section>

                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">4. PROPIEDAD INTELECTUAL</h2>
                            <p>Todo el arte, código, mecánicas de "Jefes", y narrativa visual de Gymmo son propiedad intelectual de los desarrolladores. Tienes una licencia personal, no transferible, para usar la app con fines de entretenimiento y salud personal.</p>
                        </section>

                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">5. ESTADO ALPHA/BETA</h2>
                            <p>La aplicación se encuentra en desarrollo activo. Pueden aparecer "Bugs" (errores) inesperados como monstruos errantes. Al usarla, aceptas que cierta data podría requerir reinicios o actualizaciones manuales.</p>
                        </section>
                    </div>
                </PixelCard>
            </main>
            <PixelBottomNav />
        </div>
    );
}
