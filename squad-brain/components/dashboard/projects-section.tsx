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
  <div className="
    fixed top-0 right-0 bottom-0
    left-0 lg:left-64
    bg-slate-900 text-white
    z-40 overflow-y-auto
  ">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
      <h3 className="text-xl font-semibold">Project Dashboard</h3>
      <div className="flex items-center gap-3">
        <button
        className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-yellow-500 transition"
      >Upload</button>
      <button
        onClick={() => setShowProjectDetails(false)}
        className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
      >
        Close
      </button>

      </div>
      
    </div>

    {/* Dashboard Content */}
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Project Id</h4>
        <p className="text-slate-300">Id: </p>
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Project Summary</h4>
        <p className="text-slate-300">Description: </p>
      </div>

      <div className="bg-slate-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2">account login details:</h4>
        <p className="text-slate-300">created time: </p>
        
      </div>
    </div>
  </div>
)}


        </>
    );
}

