"use client"

import { FolderKanban, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { storeNewProject, deleteProject } from "../../lib/projectSectionApiHandler";
import ProjectsHeader from "./projects-header";
import ProjectsGridSection from "./projects-grid-section";

interface Projects {
    id: string;
    name: string;
    description: string;
}

export default function ProjectsSection(userSession: any) {
    const [projects, setProjects] = useState<Array<Projects>>([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [showProjectDetails, setShowProjectDetails] = useState(false);


    useEffect(() => {
        fetch(`/api/projects?creatorId=${userSession.userSession.user.id}`)
            .then(res => res.json())
            .then(data => {
                setProjects(data)
            });
    }, [refreshFlag])
    return (
        <>
            <div className="h-full flex flex-col">
                <ProjectsHeader userID={userSession.userSession.user.id} props={{ flag: refreshFlag, setFlag: setRefreshFlag }} />
                <ProjectsGridSection projects={projects} props={{ flag: refreshFlag, setFlag: setRefreshFlag, showProjectDetails: setShowProjectDetails }} />
            </div>
            {showProjectDetails && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-slate-900 p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                        {/* Project details content goes here */}
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={() => setShowProjectDetails(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

