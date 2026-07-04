"use client";

import { PixelModal } from "../ui/PixelModal";
import { PixelButton } from "../ui/PixelButton";
import { useGameStore } from "@/lib/store";
import { useState, useEffect, useRef, useMemo } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    receiverName?: string;
    receiverId?: string;
    fullPage?: boolean;
    onBack?: () => void;
}

export function ChatModal({ isOpen, onClose, receiverName, receiverId, fullPage, onBack }: ChatModalProps) {
    const { socialMessages, sendSocialMessage, name: myName, clearSocialMessages } = useGameStore();
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const filteredMessages = useMemo(() => {
        if (!receiverId) return socialMessages; // guild/global chat
        return socialMessages.filter(m =>
            (m.senderId === 'me' && m.receiverId === receiverId) ||
            (m.senderId === receiverId)
        );
    }, [socialMessages, receiverId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [filteredMessages]);

    const handleSend = () => {
        if (!input.trim()) return;
        sendSocialMessage({
            senderId: 'me',
            senderName: myName,
            content: input,
            type: 'text',
            ...(receiverId ? { receiverId } : {}),
        });
        setInput("");
    };

    const handleClear = () => {
        clearSocialMessages(receiverName || '');
        onBack?.();
    };

    const content = (
        <div className={cn("flex flex-col", fullPage ? "h-[calc(100vh-180px)]" : "h-[400px]")}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {filteredMessages.length === 0 ? (
                    <div className="text-center text-gray-500 font-vt323 mt-10">
                        No hay mensajes aún. ¡Sé el primero en hablar!
                    </div>
                ) : (
                    filteredMessages.map((msg) => {
                        const isMe = msg.senderId === 'me';
                        return (
                            <div key={msg.id} className={cn(
                                "flex flex-col max-w-[80%]",
                                isMe ? "ml-auto items-end" : "mr-auto items-start"
                            )}>
                                <span className="font-press-start text-[6px] text-gray-500 mb-1">
                                    {msg.senderName}
                                </span>
                                <div className={cn(
                                    "p-2 border-2",
                                    isMe ? "bg-secondary/10 border-secondary text-white" : "bg-black/40 border-gray-700 text-gray-300"
                                )}>
                                    <p className="font-vt323 text-lg leading-tight">{msg.content}</p>
                                </div>
                                <span className="font-vt323 text-[10px] text-gray-600 mt-1">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t-2 border-black flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-black border-2 border-gray-800 p-2 font-vt323 text-xl focus:border-secondary outline-none transition-colors"
                />
                <PixelButton onClick={handleSend} variant="primary" className="!p-2">
                    <Send className="w-5 h-5" />
                </PixelButton>
            </div>
        </div>
    );

    if (fullPage) {
        return (
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={onBack} aria-label="Volver" className="text-gray-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="font-press-start text-xs text-white">{receiverName || "CHAT"}</h2>
                </div>
                {content}
                {receiverName && (
                    <div className="mt-4 flex gap-2">
                        <PixelButton
                            variant="outline"
                            className="flex-1 text-red-500 border-red-900 bg-red-950/20"
                            size="sm"
                            onClick={handleClear}
                        >
                            BORRAR CHAT
                        </PixelButton>
                    </div>
                )}
            </div>
        );
    }

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title={receiverName || "CHAT DEL GREMIO"}>
            {content}
        </PixelModal>
    );
}
