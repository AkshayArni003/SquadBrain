"use client"

import { FolderKanban, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectsSection(userSession: any) {
    const [projects, setProjects] = useState([]);
    const [newProjectFormVisible, setNewProjectFormVisible] = useState(false);
    const newProjectFormHandler = async (formData: any) => {
        formData.preventDefault();
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify({"name": formData.target[0].value, "description": formData.target[1].value, "creatorId": userSession.userSession.user.id}),
        });
        setNewProjectFormVisible(false);
    }
    useEffect(() => {
        // Fetch projects from API (not implemented yet)
        // Example: fetch('/api/projects').then(res => res.json()).then(data => setProjects(data));
        
        // setProjects([
        //     { id: '1', name: 'Project Alpha', description: 'Description for Project Alpha', status: 'active' },
        //     { id: '2', name: 'Project Beta', description: 'Description for Project Beta', status: 'inactive' },
        //     { id: '3', name: 'Project Gamma', description: 'Description for Project Gamma', status: 'active' },
        // ]);
    }, [])

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-slate-800 p-6 pt-20 lg:pt-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FolderKanban className="w-6 h-6" />
                            Projects
                        </h2>
                        <p className="text-slate-400 mt-1">Manage your projects and workflows</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={() => setNewProjectFormVisible(true)}>
                        <Plus className="w-5 h-5" />
                        New Project
                    </button>
                    {
                        newProjectFormVisible && <>
                                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-slate-900 p-6 rounded-lg w-96">
                                    <h3 className="text-lg font-semibold text-white mb-4">Create New Project</h3>
                                    <form className="space-y-4" onSubmit={(event) => newProjectFormHandler(event)}>
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-1">Project Name</label>
                                            <input type="text" className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white mb-1">Description</label>
                                            <textarea className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={() => setNewProjectFormVisible(false)} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors cursor-pointer">Cancel</button>
                                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    }
                </div>
                
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            <div className="flex-1 p-6 overflow-y-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-600 transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    project.status === "active"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-yellow-500/20 text-yellow-400"
                                }`}>
                                    {project.status}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm">{project.description}</p>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <FolderKanban className="w-16 h-16 text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-400 mb-2">No projects yet</h3>
                        <p className="text-slate-500">Create your first project to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
}

