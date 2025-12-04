"use client"

import { FolderKanban, Icon, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { storeNewProject, deleteProject } from "../../lib/projectSectionApiHandler";

export default function ProjectsSection(userSession: any) {
    const [projects, setProjects] = useState([]);
    const [newProjectFormVisible, setNewProjectFormVisible] = useState(false);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isDeleteTrue, setIsDeleteTrue] = useState(false);

    const handleNewProjectFormSubmit = async (formData: any) => {
        formData.preventDefault();
        await storeNewProject(formData, setRefreshFlag, setNewProjectFormVisible, refreshFlag, userSession.userSession.user.id);
    }

    const handleProjectDelete = async () => {
        if (selectedProjectId) {
            await deleteProject(selectedProjectId, setRefreshFlag, setIsDeleteModalOpen, refreshFlag);
            setIsDeleteTrue(true)
        }

    };

    useEffect(() => {
        fetch(`/api/projects?creatorId=${userSession.userSession.user.id}`)
            .then(res => res.json())
            .then(data => setProjects(data));
    }, [refreshFlag])

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
                    {/* Toast */}
                    {isDeleteTrue && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">Project Deleted Successfully</span>
                            <span className="absolute top-0 bottom-0 right-0 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setIsDeleteTrue(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={() => setNewProjectFormVisible(true)}>
                        <Plus className="w-5 h-5" />
                        New Project
                    </button>
                    {
                        newProjectFormVisible && <>
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-slate-900 p-6 rounded-lg w-96">
                                    <h3 className="text-lg font-semibold text-white mb-4">Create New Project</h3>
                                    <form className="space-y-4" onSubmit={(event) => handleNewProjectFormSubmit(event)}>
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
                                <button className=" hover:text-red-700 p-2 rounded-full cursor-pointer" onClick={() => {
                                    setSelectedProjectId(project.id);
                                    setIsDeleteModalOpen(true);
                                }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.006-2.14H9.796c-1.096 0-1.996.96-1.996 2.14v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-slate-400 text-sm">{project.description}</p>
                        </div>
                    ))}
                    {isDeleteModalOpen && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-slate-900/30 backdrop-blur-md p-6 rounded-lg w-96 border border-slate-700/40">
                                <h3 className="text-lg font-semibold text-white mb-4">Confirm Deletion</h3>
                                <p className="text-slate-300 mb-4">
                                    Are you sure you want to delete this project? This action cannot be undone.
                                </p>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
                                        onClick={() => handleProjectDelete()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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

