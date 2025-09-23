"use client"

import React, { useState, useEffect } from 'react';
import { Search, GitBranch, FileText, Users, Zap, Shield, MessageSquare, ChevronRight, CheckCircle, Github, Calendar, Database, Brain, Cpu, Network } from 'lucide-react';
import Link from "next/link";
import Image from 'next/image';
import logo from "@/public/images/SquadBrain.jpeg"

const SquadBrainLanding = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "AI Chat with Citations",
            description: "Get instant answers from your team's knowledge base with source citations",
            color: "from-cyan-400 to-blue-500"
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Auto-Generated RFCs",
            description: "Transform issues into structured RFC templates automatically",
            color: "from-blue-500 to-purple-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Real-time Collaboration",
            description: "Google Docs-style editing with track changes for team documents",
            color: "from-purple-500 to-pink-500"
        }
    ];

    const integrations = [
        { name: "Jira", icon: <Database className="w-6 h-6" />, color: "text-cyan-400" },
        { name: "GitHub", icon: <Github className="w-6 h-6" />, color: "text-blue-400" },
        { name: "Confluence", icon: <Calendar className="w-6 h-6" />, color: "text-purple-400" }
    ];

    const techStack = [
        { name: "RAG", icon: <Brain className="w-5 h-5" />, position: "top-20 left-20" },
        { name: "CRDTS", icon: <Network className="w-5 h-5" />, position: "top-32 left-16" },
        { name: "Kubernetes", icon: <Cpu className="w-5 h-5" />, position: "bottom-32 left-20" },
        { name: "Analytics", icon: <FileText className="w-5 h-5" />, position: "top-20 right-20" },
        { name: "OpenTelemetry", icon: <Shield className="w-5 h-5" />, position: "top-32 right-16" },
        { name: "OAUTH SSO", icon: <Shield className="w-5 h-5" />, position: "bottom-20 right-20" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
            {/* Animated background circuit pattern */}
            <div className="absolute inset-0 opacity-10">
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

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            {/* Logo using the brain circuit design */}
                            <div className="w-10 h-10 relative">
                                <Image src={logo} alt='Squad Brain' className='rounded-full'></Image>
                                {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse"></div>
                                <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text" style={{ WebkitBackgroundClip: 'text' }} />
                                </div> */}
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                SquadBrain
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">Features</a>
                            <a href="#integrations" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Integrations</a>
                            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                                <Link href="/login">Get Started</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Large Brain Circuit Logo */}
                        <div className="mb-12 flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80">
                                {/* Central brain with circuit patterns */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 animate-pulse"></div>

                                {/* Brain outline */}
                                <div className="absolute inset-8 rounded-full border-2 border-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                                    <Brain className="w-24 h-24 md:w-32 md:h-32 text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text animate-pulse" />
                                </div>

                                {/* Circuit connections */}
                                {techStack.map((tech, index) => (
                                    <div key={index} className={`absolute ${tech.position} flex items-center space-x-2 animate-bounce`} style={{ animationDelay: `${index * 0.5}s` }}>
                                        <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-cyan-500/30">
                                            <div className="text-cyan-400">
                                                {tech.icon}
                                            </div>
                                            <span className="text-xs text-white font-medium">{tech.name}</span>
                                        </div>
                                        {/* Connection line */}
                                        <div className="w-8 h-px bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                                SquadBrain
                            </span>
                            <br />
                            <span className="text-3xl md:text-4xl text-gray-300">
                                Unified Knowledge & Intelligence Hub
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                            Plug in Jira, GitHub, and Confluence to get a secure, multi-tenant knowledge base that answers with citations, drafts RFCs, and supports real-time collaboration.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                                <span className="relative z-10 flex items-center">
                                    <Link href="/login">Start Your Free Trial</Link>
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            <button className="border border-cyan-500/50 text-cyan-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:border-cyan-400">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm border-y border-cyan-500/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white">
                                Drowning in <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">scattered knowledge?</span>
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Engineering teams waste hours searching through tickets, PRs, and docs.
                                Important context gets lost in Slack threads. RFCs take forever to draft.
                                Knowledge silos slow down your entire organization.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "Instant answers with source citations",
                                    "Auto-generated RFC templates from issues",
                                    "Real-time collaborative editing",
                                    "Secure multi-tenant architecture"
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                        <span className="text-gray-300">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
                                <div className="space-y-4">
                                    <div className="h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-3/4 shadow-lg shadow-cyan-400/25 animate-pulse"></div>
                                    <div className="h-4 bg-gray-600/50 rounded-full w-1/2"></div>
                                    <div className="h-4 bg-gray-600/50 rounded-full w-2/3"></div>
                                    <div className="mt-6 p-4 bg-black/60 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Search className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.5)] animate-pulse" />
                                            <span className="text-sm text-gray-300">Search: "authentication flow"</span>
                                        </div>
                                        <div className="text-xs text-green-400 animate-pulse">Found in: PR #247, RFC-001, confluence-doc-auth.md</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                                Powerful Features
                            </span> for Modern Teams
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Everything you need to centralize, search, and collaborate on your team's knowledge
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-2xl border transition-all duration-500 transform hover:scale-105 relative overflow-hidden group ${activeFeature === index
                                    ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/50 shadow-2xl shadow-cyan-500/25'
                                    : 'bg-black/30 border-gray-700 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10'
                                    }`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                <div className={`mb-4 text-cyan-400 relative z-10 ${activeFeature === index ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed relative z-10">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm border-y border-purple-500/10">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                            Seamless Integrations
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Connect your existing tools and start getting value immediately
                    </p>

                    <div className="flex items-center justify-center space-x-8 mb-12">
                        {integrations.map((integration, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2 p-6 rounded-xl bg-black/60 border border-gray-700 hover:border-cyan-500/50 hover:bg-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
                                <div className={`${integration.color} drop-shadow-[0_0_5px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform duration-300`}>
                                    {integration.icon}
                                </div>
                                <span className="text-white font-medium">{integration.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-purple-500/30 shadow-lg shadow-purple-500/10 backdrop-blur-sm">
                        <div className="flex items-center justify-center space-x-4 mb-4">
                            <Shield className="w-8 h-8 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                            <span className="text-2xl font-semibold text-white">Enterprise Security</span>
                        </div>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Multi-tenant architecture with enterprise-grade security. Your data stays yours, with role-based access controls and audit trails.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Team's
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"> Knowledge?</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join forward-thinking teams who've already made the switch to smarter knowledge management.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                            <span className="relative z-10">Start Free Trial</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        <button className="text-cyan-400 hover:text-purple-400 underline transition-colors duration-300">
                            Schedule a demo →
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-cyan-500/20 py-12 px-4 sm:px-6 lg:px-8 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse"></div>
                                <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
                                    <Brain className="w-4 h-4 text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text" />
                                </div>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                SquadBrain
                            </span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © 2025 SquadBrain. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SquadBrainLanding;