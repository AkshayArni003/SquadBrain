export const storeNewProject = async (formData: any, setRefreshFlag: any, setNewProjectFormVisible: any, refreshFlag: boolean, userId: string, setProjectExists: any) => {
    formData.preventDefault();
    const response = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({ "name": formData.target[0].value, "description": formData.target[1].value, "creatorId": userId }),
    });
    if (response.status === 400) {
        setProjectExists(true);
        return;
    }
    setRefreshFlag(!refreshFlag);
    setNewProjectFormVisible(false);
}


export const deleteProject = async (projectId: string, setRefreshFlag: any, setIsDeleteModalOpen: any, refreshFlag: boolean) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
    });
    setRefreshFlag(!refreshFlag);
    setIsDeleteModalOpen(false);
}