import { FolderKanban, Plus, Search } from "lucide-react";
import { useState } from "react";
import { storeNewProject } from "../../lib/projectSectionApiHandler";

interface ProjectsHeaderProps {
    userID: string;
    props: {
        flag: boolean;
        setFlag: React.Dispatch<React.SetStateAction<boolean>>;
    };
}

export default function ProjectsHeader({ userID, props }: ProjectsHeaderProps) {
    const [newProjectFormVisible, setNewProjectFormVisible] = useState(false);
    const [isDeleteTrue, setIsDeleteTrue] = useState(false);
    const [projectExists, setProjectExists] = useState(false);
    const handleNewProjectFormSubmit = async (formData: any) => {
        formData.preventDefault();
        await storeNewProject(formData, props.setFlag, setNewProjectFormVisible, props.flag, userID, setProjectExists);
    }

    return (
        <>
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
                                            <input type="text" className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" onChange={() => setProjectExists(false)} />
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
                                    {projectExists && (
                                        <p className="text-red-500 mt-4">Project name already exists.</p>
                                    )}
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
        </>
    )
}