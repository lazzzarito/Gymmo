"use client";

import { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { Users, MessageSquare, Plus, Search } from "lucide-react";
import { MOCK_CHATS, MOCK_USERS, ChatThread, SocialUser } from "@/lib/social";
import { cn } from "@/lib/utils";
import { ChatWindow } from "./ChatWindow";

export function SocialHub() {
    const [activeTab, setActiveTab] = useState<'chats' | 'friends'>('chats');
    const [chats, setChats] = useState<ChatThread[]>(MOCK_CHATS);
    const [friends, setFriends] = useState<SocialUser[]>(MOCK_USERS);
    const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);

    if (selectedChat) {
        return <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />;
    }

    return (
        <div className="space-y-4">
            {/* TABS */}
            <div className="flex gap-2">
                <PixelButton
                    className={cn("flex-1", activeTab === 'chats' ? "bg-primary text-black" : "bg-gray-800")}
                    onClick={() => setActiveTab('chats')}
                >
                    CHATS
                </PixelButton>
                <PixelButton
                    className={cn("flex-1", activeTab === 'friends' ? "bg-primary text-black" : "bg-gray-800")}
                    onClick={() => setActiveTab('friends')}
                >
                    AMIGOS
                </PixelButton>
            </div>

            {/* SEARCH */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar @usuario o chat..."
                    className="w-full bg-black/50 border-2 border-gray-700 p-3 pl-10 font-vt323 text-white focus:outline-none focus:border-primary"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>

            {/* CONTENT */}
            <div className="space-y-3 min-h-[300px]">
                {activeTab === 'chats' ? (
                    <>
                        {chats.map(chat => (
                            <PixelCard
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className="flex items-center gap-3 p-3 hover:bg-surface/80 cursor-pointer transition-colors group"
                            >
                                <div className="relative w-12 h-12">
                                    <img
                                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${chat.participants[0].avatarSeed}`}
                                        alt="Avatar"
                                        className="w-full h-full border-2 border-white bg-gray-700"
                                    />
                                    {chat.participants[0].isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-black" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-press-start text-[10px] text-white truncate">{chat.participants[0].displayName}</h3>
                                        <span className="font-vt323 text-gray-500 text-sm">{chat.lastMessage.timestamp}</span>
                                    </div>
                                    <p className="font-vt323 text-gray-400 truncate text-sm">
                                        {chat.lastMessage.senderId === 'me' && "Tú: "}
                                        {chat.lastMessage.content}
                                    </p>
                                </div>
                            </PixelCard>
                        ))}
                    </>
                ) : (
                    <>
                        {friends.map(friend => (
                            <PixelCard key={friend.id} className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 border-2 border-white bg-gray-700">
                                        <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${friend.avatarSeed}`} alt="Avatar" className="w-full h-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-press-start text-[10px] text-white">{friend.displayName}</h3>
                                        <p className="font-vt323 text-gray-400 text-xs">{friend.level} {friend.class} • {friend.isOnline ? 'En línea' : 'Ausente'}</p>
                                    </div>
                                </div>
                                <PixelButton size="sm" variant="secondary" className="px-2">
                                    <MessageSquare className="w-4 h-4" />
                                </PixelButton>
                            </PixelCard>
                        ))}
                        <PixelButton className="w-full border-dashed border-gray-700 text-gray-500 hover:text-white" variant="outline">
                            <Plus className="w-4 h-4 mr-2" /> Añadir Amigo
                        </PixelButton>
                    </>
                )}
            </div>
        </div>
    );
}
