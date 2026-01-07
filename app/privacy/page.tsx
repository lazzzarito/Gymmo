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
                    <div className="font-vt323 text-lg text-gray-300 space-y-6">
                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">1. ALMACENAMIENTO HEROICO (DATOS)</h2>
                            <p>Gymmo opera bajo un principio de "Soberanía de Datos". Toda tu información de perfil, rutinas, historial de ejercicios y progreso de nivel se almacena <strong>localmente en tu dispositivo</strong>. No subimos tus estadísticas a servidores externos ni nubes corporativas sin tu consentimiento explícito.</p>
                        </section>

                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">2. CREDENCIALES DE ACCESO</h2>
                            <p>Para proteger tu grimorio de entrenamiento, implementamos un sistema de autenticación local. Tu contraseña se guarda en tu dispositivo para evitar accesos no autorizados por parte de terceros físicos que tomen tu teléfono. Gymmo no puede recuperar tu contraseña si la olvidas, ya que no la gestionamos remotamente.</p>
                        </section>

                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">3. PERMISOS DEL SISTEMA</h2>
                            <ul className="list-disc pl-4 space-y-1">
                                <li><strong>Vibración y Audio:</strong> Utilizamos la API de vibración y audio web para proporcionar retroalimentación táctil y sonora (Feedback Hártico) durante tus batallas (entrenamientos), mejorando la inmersión.</li>
                                <li><strong>Notificaciones:</strong> Solicitamos permiso para enviarte "Avisos de Misión" locales. Estas alertas sirven para recordarte tu "Combate Diario" y no para publicidad.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">4. COMPARTIR CON EL GREMIO</h2>
                            <p>La función de "Compartir" genera una captura estática de tus logros visuales. Gymmo no transmite datos en tiempo real a otros usuarios. Tú tienes el control total de dónde y con quién compartes estas imágenes (WhatsApp, Redes Sociales, etc).</p>
                        </section>

                        <section>
                            <h2 className="text-secondary font-bold text-xl mb-1">5. CAMBIOS EN LA POLÍTICA</h2>
                            <p>Nos reservamos el derecho de actualizar este pergamino de privacidad a medida que la aplicación evolucione a versiones Beta o Gold. Se te notificará mediante una alerta en el Hub si surgen cambios drásticos.</p>
                        </section>
                    </div>
                </PixelCard>
            </main>
            <PixelBottomNav />
        </div>
    );
}
