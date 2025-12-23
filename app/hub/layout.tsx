import { PixelBottomNav } from "@/components/layout/PixelBottomNav";
import { PixelHeader } from "@/components/layout/PixelHeader";

export default function HubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PixelHeader />
            <main className="pb-20 pt-24 min-h-screen px-4">
                {children}
            </main>
            <PixelBottomNav />
        </div>
    );
}
