"use client"

import { FolderKanban, Plus, Search } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { storeNewProject, deleteProject } from "../../lib/projectSectionApiHandler";
import ProjectsHeader from "./projects-header";
import ProjectsGridSection from "./projects-grid-section";
import ProjectDetails from "./project-details";
import { Projects } from "projects";
import Loader from "../common-components/loader";

export default function ProjectsSection(userSession: any) {
  const [projects, setProjects] = useState<Array<Projects>>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedPoject, setSelectedProject] = useState<Projects>({
    id: "",
    name: "",
    description: "",
    creatorId: "",
    creatorName: ""
  });
  useEffect(() => {
    setTimeout(() => {
      fetch(`/api/projects?creatorId=${userSession.userSession.user.id}`)
        .then(res => res.json())
        .then(data => {
          setProjects(data)
        });
    }, 5000)
  }, [refreshFlag])
  return (
    <Suspense>
      <div className="h-full flex flex-col">
        <ProjectsHeader userID={userSession.userSession.user.id} props={{ flag: refreshFlag, setFlag: setRefreshFlag }} />
        {!projects.length && <Loader />}
        <ProjectsGridSection projects={projects} props={{ flag: refreshFlag, setFlag: setRefreshFlag, showProjectDetails: setShowProjectDetails, selectedProject: setSelectedProject }} />
      </div>
      {showProjectDetails && <ProjectDetails project={selectedPoject} showProject={setShowProjectDetails} />}
    </Suspense>
  );
}

