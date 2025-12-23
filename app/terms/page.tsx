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
                    <div className="font-vt323 text-lg text-gray-300 space-y-4">
                        <section>
                            <h2 className="text-white font-bold">1. Aceptación</h2>
                            <p>Al acceder a Gymmo, aceptas estos términos y te comprometes a seguir las sendas de la disciplina y el hierro.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold">2. Responsabilidad</h2>
                            <p>El usuario es responsable de realizar los ejercicios con la técnica adecuada para evitar lesiones. Consulta siempre a un profesional antes de levantar cargas pesadas.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold">3. Gamificación</h2>
                            <p>Los niveles y logros en Gymmo son representaciones digitales de tu esfuerzo y no garantizan resultados físicos sin un entrenamiento real y constante.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold">4. Código de Honor</h2>
                            <p>Se espera que los miembros de la comunidad y los gremios mantengan un trato heroico y respetuoso entre sí.</p>
                        </section>
                    </div>
                </PixelCard>
            </main>
            <PixelBottomNav />
        </div>
    );
}
