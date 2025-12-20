declare module 'projects' {
    interface Projects {
        id: string;
        name: string;
        description: string;
        creatorId: string;
    }
    interface ProjectsGridSectionProps {
        projects: Array<Projects>;
        props: {
            flag: boolean;
            setFlag: React.Dispatch<React.SetStateAction<boolean>>;
            showProjectDetails: React.Dispatch<React.SetStateAction<{ show: boolean; project: Projects | null }>>;
        };
    }
}