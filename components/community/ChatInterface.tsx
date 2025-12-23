"use client";

import { useState, useRef, useEffect } from "react";
import { PixelInput } from "@/components/ui/PixelInput";
import { PixelButton } from "@/components/ui/PixelButton";
import { Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: string; // 'me' or 'other'
    timestamp: Date;
    avatarHost?: boolean; // if true, shows avatar (simulated)
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: '¡Bienvenidos al Gremio de Hierro!', sender: 'other', timestamp: new Date(), avatarHost: true },
        { id: '2', text: 'Alguien para Dungeon Run hoy?', sender: 'other', timestamp: new Date(), avatarHost: true },
    ]);
    const [inputValue, setInputValue] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'me',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");

        // Simulate reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: '¡A darle duro! 💪',
                sender: 'other',
                timestamp: new Date(),
                avatarHost: true
            }]);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[75vh] bg-black/20 border-2 border-gray-800 rounded-lg overflow-hidden relative">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex items-end gap-2",
                            msg.sender === 'me' ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        {msg.sender === 'other' && (
                            <div className="w-8 h-8 bg-surface border-2 border-gray-600 flex items-center justify-center shrink-0 rounded-full">
                                <User className="w-4 h-4 text-gray-400" />
                            </div>
                        )}

                        <div
                            className={cn(
                                "max-w-[75%] p-3 text-sm font-vt323 relative",
                                "border-2",
                                msg.sender === 'me'
                                    ? "bg-primary/20 border-primary text-white rounded-tr-none rounded-lg"
                                    : "bg-surface border-gray-600 text-gray-200 rounded-tl-none rounded-lg"
                            )}
                        >
                            {msg.text}
                            {/* Tiny Pixel Arrow decoration */}
                            <div className={cn(
                                "absolute bottom-[-2px] w-2 h-2 bg-inherit border-inherit border-b-2 border-r-2 transform rotate-45",
                                msg.sender === 'me' ? "-right-1 bg-black" : "-left-1 bg-surface"
                            )} />
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-surface border-t-2 border-gray-800 flex gap-2">
                <PixelInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe al gremio..."
                    className="flex-1 bg-black/50"
                />
                <PixelButton size="sm" onClick={handleSend} className="px-3">
                    <Send className="w-4 h-4" />
                </PixelButton>
            </div>
        </div>
    );
}
