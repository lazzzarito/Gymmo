"use client";

import { useGameStore } from "@/lib/store";
import { SHOP_ITEMS } from "@/lib/items";
import { PixelCard } from "@/components/ui/PixelCard";

export function InventoryGrid() {
    const { inventory } = useGameStore();

    if (inventory.length === 0) {
        return (
            <PixelCard className="bg-black/20 border-gray-800 text-center py-8">
                <p className="font-vt323 text-gray-500">Tu inventario está vacío.</p>
                <p className="font-press-start text-[8px] text-primary mt-2">VISIT THE SHOP</p>
            </PixelCard>
        );
    }

    // Map inventory IDs back to item objects
    const myItems = inventory.map(id => SHOP_ITEMS.find(i => i.id === id)).filter(Boolean);

    return (
        <div className="grid grid-cols-4 gap-2">
            {myItems.map((item, idx) => (
                <div
                    key={`${item!.id}-${idx}`}
                    className="aspect-square bg-surface border-2 border-black flex items-center justify-center text-2xl relative group cursor-help"
                    title={item!.name}
                >
                    {item!.icon}
                    {/* Tooltip-ish overlay on hover not implemented in pure CSS perfectly without extra div, relying on native title for now or simple hover effect */}
                </div>
            ))}
        </div>
    );
}
