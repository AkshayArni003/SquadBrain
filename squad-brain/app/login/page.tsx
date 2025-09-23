import MainHeader from "@/components/headers/main-header";
import OAuthButton from "@/components/OAuth-buttons/oauth-button";
import { Search, GitBranch, FileText, Users, Zap, Shield, MessageSquare, ChevronRight, CheckCircle, Github, Calendar, Database, Brain, Cpu, Network } from 'lucide-react';
import Image from 'next/image';
import logo from "@/public/images/SquadBrain.jpeg"

export default function LoginPage() {
    const techStack = [
        { name: "RAG", icon: <Brain className="w-4 h-4" />, position: "top-16 left-16" },
        { name: "CRDTS", icon: <Network className="w-4 h-4" />, position: "top-24 left-12" },
        { name: "Kubernetes", icon: <Cpu className="w-4 h-4" />, position: "bottom-24 left-16" },
        { name: "Analytics", icon: <FileText className="w-4 h-4" />, position: "top-16 right-16" },
        { name: "OpenTelemetry", icon: <Shield className="w-4 h-4" />, position: "top-24 right-12" },
        { name: "OAUTH SSO", icon: <Shield className="w-4 h-4" />, position: "bottom-16 right-16" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
            <MainHeader />

            {/* Animated background circuit pattern */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 10,0 L 10,10 M 0,10 L 20,10" stroke="url(#gradient)" strokeWidth="0.5" fill="none" opacity="0.3" />
                            <circle cx="10" cy="10" r="1" fill="url(#gradient)" opacity="0.6" />
                        </pattern>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00FFFF" />
                            <stop offset="50%" stopColor="#0080FF" />
                            <stop offset="100%" stopColor="#FF00FF" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Main content container */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-4 pb-20 relative z-10">
                {/* Title Section */}
                <div className="justify-center text-center mb-6 max-w-md transform -translate-y-4">
                    <Image
                        src={logo}
                        width={200}
                        height={200}
                        alt="Squad Brain"
                        className="block mx-auto rounded-full"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        SquadBrain
                    </h1>
                    <p className="text-lg font-semibold mb-2 text-white">
                        Your Real-time Team Knowledge Hub
                    </p>
                    <p className="text-gray-300">
                        Log in to your SquadBrain account
                    </p>
                </div>

                {/* Login Section */}
                <div className="w-full max-w-sm transform -translate-y-2">
                    <div className="bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
                        <div className="flex flex-col gap-4">
                            <OAuthButton provider="google" logo="/images/google.jpg">
                                Continue with Google
                            </OAuthButton>
                            <OAuthButton provider="github" logo="/images/github.png">
                                Continue with GitHub
                            </OAuthButton>
                        </div>
                    </div>

                    {/* Footer text */}
                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-400">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}