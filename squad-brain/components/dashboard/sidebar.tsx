"use client"

import { FolderKanban, MessageSquare, LogOut, X } from "lucide-react";
import { logout } from "@/actions/auth";
import Image from "next/image";
import logo from "@/public/images/SquadBrain.jpeg";

type SidebarSection = "projects" | "chat";

interface SidebarProps {
    activeSection: SidebarSection;
    onSectionChange: (section: SidebarSection) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, isOpen, onToggle }: SidebarProps) {
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 w-64`}
            >
                {/* Logo/Brand */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image
                                src={logo}
                                alt="SquadBrain"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                            <h1 className="text-xl font-bold text-white">SquadBrain</h1>
                        </div>
                        <button
                            onClick={onToggle}
                            className="lg:hidden text-slate-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => onSectionChange("projects")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${activeSection === "projects"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        <FolderKanban className="w-5 h-5" />
                        <span className="font-medium">Projects</span>
                    </button>

                    <button
                        onClick={() => onSectionChange("chat")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${activeSection === "chat"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-medium">Chat</span>
                    </button>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

