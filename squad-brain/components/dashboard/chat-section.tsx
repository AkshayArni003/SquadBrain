"use client"

import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useState } from "react";

export default function ChatSection() {
    const [messages] = useState([
        { id: 1, role: "user", content: "Hello! How can I help you today?" },
        { id: 2, role: "assistant", content: "Hi! I'm here to assist you with any questions about your projects or team knowledge base." },
    ]);
    const [inputMessage, setInputMessage] = useState("");

    const handleSend = () => {
        if (inputMessage.trim()) {
            // Handle send message logic here
            setInputMessage("");
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-slate-800 p-6 pt-20 lg:pt-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Chat
                </h2>
                <p className="text-slate-400 mt-1">Ask questions and get instant answers from your knowledge base</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Bot className="w-16 h-16 text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-400 mb-2">Start a conversation</h3>
                        <p className="text-slate-500">Ask me anything about your projects or team knowledge</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${
                                message.role === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            {message.role === "assistant" && (
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div
                                className={`max-w-[70%] rounded-lg p-4 ${
                                    message.role === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-slate-200 border border-slate-700"
                                }`}
                            >
                                <p>{message.content}</p>
                            </div>
                            {message.role === "user" && (
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-800 p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <button
                        onClick={handleSend}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Send className="w-5 h-5" />
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

