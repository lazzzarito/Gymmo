"use client";

import { PixelHeader } from "@/components/layout/PixelHeader";
import { PixelBottomNav } from "@/components/layout/PixelBottomNav";
import { PixelCard } from "@/components/ui/PixelCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PixelHeader />
            <main className="pb-24 pt-24 px-4 max-w-md mx-auto space-y-6">
                <Link href="/hub" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-vt323 text-lg">
                    <ChevronLeft className="w-5 h-5" /> Volver al Hub
                </Link>

                <PixelCard className="p-6">
                    <h1 className="font-press-start text-sm text-secondary mb-6 lowercase">POLÍTICA DE PRIVACIDAD</h1>
                    <div className="font-vt323 text-lg text-gray-300 space-y-4">
                        <section>
                            <h2 className="text-white font-bold">1. Recopilación de Datos</h2>
                            <p>Gymmo recopila datos básicos de tu progreso físico, estadísticas de entrenamiento y nivel de personaje para guardarlos localmente en tu dispositivo.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold">2. Uso de la Información</h2>
                            <p>Toda la información se utiliza exclusivamente para la gamificación de tu entrenamiento y la visualización de tus logros personales.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold">3. Almacenamiento Local</h2>
                            <p>Gymmo es una aplicación centrada en la privacidad. Tus datos no se suben a servidores externos por defecto; se almacenan en el LocalStorage de tu navegador.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold">4. Comunicación</h2>
                            <p>Al utilizar las funciones sociales (QR y Gremios), solo compartes tu alias y nivel con otros usuarios de forma directa.</p>
                        </section>
                    </div>
                </PixelCard>
            </main>
            <PixelBottomNav />
        </div>
    );
}
