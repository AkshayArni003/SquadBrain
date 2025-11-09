"use client"

import { useState } from "react";
import Sidebar from "./sidebar";
import ProjectsSection from "./projects-section";
import ChatSection from "./chat-section";
import { Menu } from "lucide-react";

type SidebarSection = "projects" | "chat" ;

export default function DashboardLayout() {
    const [activeSection, setActiveSection] = useState<SidebarSection>("projects");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSectionChange = (section: SidebarSection) => {
        setActiveSection(section);
        setIsSidebarOpen(false); // Close sidebar on mobile after selection
    };

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden">
            <Sidebar 
                activeSection={activeSection} 
                onSectionChange={handleSectionChange}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <main className="flex-1 lg:ml-64 bg-slate-950 overflow-hidden relative">
                {/* Mobile menu button */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                {activeSection === "projects" && <ProjectsSection />}
                {activeSection === "chat" && <ChatSection />}
            </main>
        </div>
    );
}

