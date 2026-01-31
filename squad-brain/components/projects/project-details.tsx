import React, { useEffect, useState } from "react";
import Table from "../common-components/tableView";
import { Projects } from "projects";
import Upload from "./upload";

export default function ProjectDetails({ project, showProject }: { project: Projects, showProject: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isUpload, setIsUpload] = useState(false);
    const [projectFiles, setProjectFiles] = useState<Array<any>>([]);
    useEffect(() => {
        fetch(`/api/projects/file-uploads?projectId=${project.id}`)
            .then(res => res.json())
            .then(data => {
                setProjectFiles(data)
            });
    }, [isUpload])
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 lg:left-64 bg-slate-900 text-white z-40 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
                <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"
                    onClick={() => showProject(false)}>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                <h3 className="text-xl font-semibold">Project Details</h3>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-yellow-500 transition cursor-pointer" onClick={() => setIsUpload(true)}>
                        Upload
                    </button>
                </div>
            </div>

            {/* Project Details */}
            <div className="p-6">
                <div className="bg-slate-800 rounded-lg p-4">
                    <div className="grid grid-cols-4 mb-4 font-semibold text-slate-300 pb-2 gap-2">
                        <div>
                            <div>Project Name</div>
                            <p className="font-normal">{project.name}</p>
                        </div>
                        <div>
                            <div>Project Id</div>
                            <p className="font-normal">{project.id}</p>
                        </div>
                        <div>
                            <div>Description</div>
                            <p className="font-normal">{project.description}</p>
                        </div>
                        <div>
                            <div>Owner</div>
                            <p className="font-normal">{project.creatorName}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Upload*/}
            {isUpload && <Upload upload={setIsUpload} projectId={project.id} />}
            {/* Table View*/}
            <Table projectFiles={projectFiles} />
        </div>
    )
};