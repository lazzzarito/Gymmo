"use client";

import { PixelButton } from "@/components/ui/PixelButton";
import { Send, ArrowLeft, Image as ImageIcon, Mic, Share } from "lucide-react";
import { useState } from "react";
import { ChatThread, ChatMessage } from "@/lib/social";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
    chat: ChatThread;
    onBack: () => void;
}

export function ChatWindow({ chat, onBack }: ChatWindowProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        chat.lastMessage,
        { id: 'm0', senderId: 'u1', content: '¿Viste la rutina que compartí?', timestamp: '10:29', type: 'text' as const }
    ].reverse());

    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            senderId: 'me',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };
        setMessages([...messages, newMsg]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-180px)]">
            {/* HEADER */}
            <div className="flex items-center gap-3 border-b-2 border-gray-800 pb-3 mb-4">
                <button onClick={onBack} className="text-gray-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8">
                    <img
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${chat.participants[0].avatarSeed}`}
                        alt="Avatar"
                        className="w-full h-full border-2 border-white bg-gray-700"
                    />
                </div>
                <div>
                    <h3 className="font-press-start text-[10px] text-white">{chat.participants[0].displayName}</h3>
                    <span className="text-[10px] text-green-400 font-vt323 block">En línea</span>
                </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide">
                {messages.map((msg) => {
                    const isMe = msg.senderId === 'me';
                    return (
                        <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                            <div
                                className={cn(
                                    "max-w-[80%] p-3 border-2 font-vt323 text-lg leading-tight relative",
                                    isMe
                                        ? "bg-primary text-black border-white rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-lg"
                                        : "bg-gray-800 text-white border-gray-600 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-lg"
                                )}
                            >
                                {msg.content}
                                <span className={cn("block text-[10px] text-right mt-1 opacity-70", isMe ? "text-black" : "text-gray-400")}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* INPUT */}
            <div className="flex items-center gap-2 mt-auto">
                <button className="p-2 text-gray-400 hover:text-white bg-gray-900 border border-gray-700">
                    <ImageIcon className="w-4 h-4" />
                </button>
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe..."
                        className="w-full bg-black/50 border-2 border-gray-700 p-2 font-vt323 text-white focus:outline-none focus:border-primary"
                    />
                </div>
                <button className="p-2 text-gray-400 hover:text-white bg-gray-900 border border-gray-700">
                    <Mic className="w-4 h-4" />
                </button>
                <PixelButton onClick={handleSend} size="sm" variant="primary" className="px-3">
                    <Send className="w-4 h-4" />
                </PixelButton>
            </div>
        </div>
    );
}
