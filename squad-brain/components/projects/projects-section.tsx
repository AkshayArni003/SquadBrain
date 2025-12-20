"use client"

import { FolderKanban, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { storeNewProject, deleteProject } from "../../lib/projectSectionApiHandler";
import ProjectsHeader from "./projects-header";
import ProjectsGridSection from "./projects-grid-section";
import ProjectDetails from "./project-details";
import { Projects } from "projects";

export default function ProjectsSection(userSession: any) {
  const [projects, setProjects] = useState<Array<Projects>>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState({ show: false, project: null as Projects | null });


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
      {showProjectDetails.show && <ProjectDetails project={showProjectDetails.project} />}


    </>
  );
}

