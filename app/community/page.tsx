"use client";

import { useGameStore } from "@/lib/store";
import { PixelHeader } from "@/components/layout/PixelHeader";
import { PixelBottomNav } from "@/components/layout/PixelBottomNav";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { MOCK_FRIENDS, MOCK_GUILDS, MOCK_USERS, MOCK_CHATS, ChatThread, Friend } from "@/lib/social";
import { Users, Shield, MessageSquare, Sword, Zap, UserPlus, Heart, Search, Plus, QrCode } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChatWindow } from "@/components/community/ChatWindow";
import { QRModal } from "@/components/social/QRModal";

export default function CommunityPage() {
    const { friends, guilds, activeGuildId, joinGuild, createGuild, level, removeFriend, clearSocialMessages } = useGameStore();
    const [activeTab, setActiveTab] = useState<'friends' | 'guilds'>('friends');
    const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);
    const [isQROpen, setIsQROpen] = useState(false);

    // Filter & Data
    const displayFriends = friends.length > 0 ? friends : MOCK_FRIENDS;
    const allGuilds = guilds.length > 0 ? guilds : MOCK_GUILDS;
    const currentGuild = allGuilds.find(g => g.id === activeGuildId);

    if (selectedChat) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <PixelHeader />
                <main className="pb-24 pt-24 px-4 max-w-md mx-auto">
                    <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
                    <div className="mt-4 flex gap-2">
                        <PixelButton
                            variant="outline"
                            className="flex-1 text-red-500 border-red-900 bg-red-950/20"
                            size="sm"
                            onClick={() => {
                                clearSocialMessages(selectedChat.participants[0].id);
                                setSelectedChat(null);
                            }}
                        >
                            BORRAR CHAT
                        </PixelButton>
                    </div>
                </main>
                <PixelBottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <PixelHeader />
            <main className="pb-24 pt-24 px-4 max-w-md mx-auto space-y-6">

                {/* Community Tabs */}
                <div className="flex bg-black/40 border-2 border-gray-800 rounded-sm overflow-hidden">
                    <button
                        onClick={() => setActiveTab('friends')}
                        className={cn(
                            "flex-1 py-3 font-press-start text-[8px] transition-all flex flex-col items-center justify-center gap-1",
                            activeTab === 'friends' ? "bg-secondary text-black" : "text-gray-500 hover:text-white"
                        )}
                    >
                        <Users className="w-3 h-3" /> MI CÍRCULO
                    </button>
                    <button
                        onClick={() => setActiveTab('guilds')}
                        className={cn(
                            "flex-1 py-3 font-press-start text-[8px] transition-all flex flex-col items-center justify-center gap-1",
                            activeTab === 'guilds' ? "bg-secondary text-black" : "text-gray-500 hover:text-white"
                        )}
                    >
                        <Shield className="w-3 h-3" /> GREMIOS
                    </button>
                </div>

                {/* QR CONNECT BUTTON */}
                {activeTab === 'friends' && (
                    <PixelCard
                        onClick={() => setIsQROpen(true)}
                        className="bg-secondary/10 border-secondary group cursor-pointer hover:bg-secondary/20 transition-all py-4"
                    >
                        <div className="flex items-center justify-center gap-3 text-center">
                            <QrCode className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="font-press-start text-[10px] text-white">CONEXIÓN HEROICA</h3>
                                <p className="font-vt323 text-gray-400 text-sm">Añade héreos en persona para chatear</p>
                            </div>
                        </div>
                    </PixelCard>
                )}

                {activeTab === 'friends' && (
                    <div className="space-y-3">
                        <h2 className="font-press-start text-[10px] text-gray-400 px-1 uppercase mb-2">Compañeros de Armas</h2>
                        {displayFriends.map(friend => (
                            <PixelCard
                                key={friend.id}
                                className="p-3 border-gray-800 hover:bg-gray-800/20 cursor-pointer group transition-colors"
                                onClick={() => setSelectedChat({
                                    id: `chat-${friend.id}`,
                                    participants: [{
                                        id: friend.id,
                                        displayName: friend.name,
                                        class: friend.heroClass,
                                        level: friend.level,
                                        avatarSeed: friend.avatarSeed || friend.name,
                                        isOnline: friend.isOnline
                                    }],
                                    lastMessage: { id: '0', senderId: friend.id, content: 'Escribe un mensaje...', timestamp: '', type: 'text' },
                                    unreadCount: 0
                                })}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 border-2 flex items-center justify-center relative bg-gray-900 group-hover:border-secondary transition-colors",
                                            friend.hasAura ? "border-secondary" : "border-gray-700"
                                        )}>
                                            <img
                                                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${friend.avatarSeed || friend.name}`}
                                                alt="Avatar"
                                                className="w-full h-full"
                                            />
                                            {friend.isOnline && <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-secondary rounded-full border-2 border-black" />}
                                        </div>
                                        <div>
                                            <h3 className="font-press-start text-[9px] text-white group-hover:text-secondary transition-colors">
                                                {friend.name}
                                            </h3>
                                            <p className="font-vt323 text-gray-500 text-xs">
                                                Lvl {friend.level} {friend.heroClass}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="p-2 text-gray-600 group-hover:text-secondary transition-colors">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm(`⚠ ADVERTENCIA ⚠\n¿Estás seguro de que quieres disolver tu alianza con ${friend.name}?\nSe eliminará de tu círculo de héroes.`)) {
                                                    removeFriend(friend.id);
                                                }
                                            }}
                                            className="p-2 border border-gray-700 hover:border-red-500 text-gray-500 hover:text-red-500 transition-colors bg-black/40"
                                            title="Eliminar amigo"
                                        >
                                            <Plus className="w-4 h-4 rotate-45" />
                                        </button>
                                    </div>
                                </div>
                            </PixelCard>
                        ))}
                    </div>
                )}



                {activeTab === 'guilds' && (
                    <div className="space-y-4">
                        {currentGuild ? (
                            <div className="space-y-6">
                                <PixelCard className="relative overflow-hidden border-secondary bg-secondary/5 py-6 text-center">
                                    <div className="text-4xl mb-2">{currentGuild.emblem}</div>
                                    <h2 className="font-press-start text-sm text-white mb-2 uppercase tracking-wide">{currentGuild.name}</h2>
                                    <p className="font-vt323 text-gray-400 px-4 mb-4">{currentGuild.description}</p>

                                    <div className="grid grid-cols-2 gap-4 border-t border-secondary/20 pt-4 px-4">
                                        <div className="text-left border-r border-secondary/20">
                                            <div className="font-press-start text-[6px] text-secondary mb-1">PODER SEMANAL</div>
                                            <div className="font-vt323 text-2xl text-white">{currentGuild.totalPower} <span className="text-[10px] text-gray-500">kg</span></div>
                                        </div>
                                        <div className="text-left pl-2">
                                            <div className="font-press-start text-[6px] text-secondary mb-1">MIEMBROS</div>
                                            <div className="font-vt323 text-2xl text-white">{currentGuild.members.length} / 50</div>
                                        </div>
                                    </div>
                                </PixelCard>

                                <div className="space-y-3">
                                    <h3 className="font-press-start text-[10px] text-gray-500 px-1 uppercase">Contribuyentes</h3>
                                    {currentGuild.members.map(member => (
                                        <div key={member.id} className="flex items-center justify-between p-3 bg-black/40 border-l-2 border-secondary">
                                            <div className="font-vt323 text-lg text-white">{member.name}</div>
                                            <div className="font-press-start text-[8px] text-gray-500">{member.contribution} kg</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="font-press-start text-[10px] text-gray-500 px-1 uppercase">Explorar Gremios</h2>
                                {allGuilds.map(guild => (
                                    <PixelCard key={guild.id} className="p-4 border-gray-800 bg-black/20">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{guild.emblem}</span>
                                                <div>
                                                    <h3 className="font-press-start text-[10px] text-white mb-1">{guild.name}</h3>
                                                    <p className="font-press-start text-[6px] text-gray-500">REQ. LVL {guild.requiredLevel}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => joinGuild(guild.id)}
                                                className={cn(
                                                    "font-press-start text-[8px] px-3 py-2 border-2",
                                                    level >= guild.requiredLevel
                                                        ? "border-secondary text-secondary hover:bg-secondary hover:text-black"
                                                        : "border-gray-800 text-gray-600 cursor-not-allowed"
                                                )}
                                                disabled={level < guild.requiredLevel}
                                            >
                                                UNIRSE
                                            </button>
                                        </div>
                                        <p className="font-vt323 text-sm text-gray-400">{guild.description}</p>
                                    </PixelCard>
                                ))}

                                <div className="mt-8 pt-6 border-t border-gray-800">
                                    <h3 className="font-press-start text-[10px] text-gray-500 px-1 uppercase mb-4">Fundar un Gremio</h3>
                                    <PixelCard className={cn(
                                        "p-6 text-center border-dashed",
                                        level >= 50 ? "border-secondary bg-secondary/5" : "border-gray-800 bg-black/20 opacity-60"
                                    )}>
                                        <div className="text-3xl mb-3">{level >= 50 ? '👑' : '🔒'}</div>
                                        <h4 className="font-press-start text-[10px] text-white mb-2">SÉ UN LÍDER</h4>
                                        <p className="font-vt323 text-gray-400 mb-4 px-4 text-center">
                                            {level >= 50
                                                ? "Has alcanzado el rango de leyenda. Crea tu propio gremio y recluta seguidores."
                                                : `Desbloquea la creación de gremios al alcanzar el NIVEL 50.`}
                                        </p>
                                        <button
                                            disabled={level < 50}
                                            onClick={() => createGuild({
                                                name: `Gremio de ${level} Héroes`,
                                                description: 'Un nuevo gremio nace para conquistar las mazmorras.',
                                                emblem: '⚔️',
                                                requiredLevel: 5
                                            })}
                                            className={cn(
                                                "font-press-start text-[8px] px-6 py-3 border-2 transition-all",
                                                level >= 50
                                                    ? "border-secondary text-secondary hover:bg-secondary hover:text-black"
                                                    : "border-gray-700 text-gray-600 cursor-not-allowed"
                                            )}
                                        >
                                            {level >= 50 ? "CREAR GREMIO" : "BLOQUEADO (LVL 50)"}
                                        </button>
                                    </PixelCard>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <QRModal isOpen={isQROpen} onClose={() => setIsQROpen(false)} />
            <PixelBottomNav />
        </div>
    );
}
