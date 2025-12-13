import { FolderKanban, Plus, Search } from "lucide-react";
import { useState } from "react";
import { deleteProject } from "../../lib/projectSectionApiHandler";

interface Projects {
    id: string;
    name: string;
    description: string;
}
interface ProjectsGridSectionProps {
    projects: Array<Projects>;
    props: {
        flag: boolean;
        setFlag: React.Dispatch<React.SetStateAction<boolean>>;
        showProjectDetails: React.Dispatch<React.SetStateAction<boolean>>;
    };
}
export default function ProjectsGridSection({ projects, props }: ProjectsGridSectionProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isDeleteTrue, setIsDeleteTrue] = useState(false);
    const handleProjectDelete = async () => {
        if (selectedProjectId) {
            await deleteProject(selectedProjectId, props.setFlag, setIsDeleteModalOpen, props.flag);
            setIsDeleteTrue(true)
        }

    };
    return (
        <>
            {/* Projects Grid */}
            <div className="flex-1 p-6 overflow-y-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-600 transition-colors cursor-pointer"
                            onClick={() => { console.log("Show details for project:", project.id); props.showProjectDetails(true); }}
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
        </>
    )
}