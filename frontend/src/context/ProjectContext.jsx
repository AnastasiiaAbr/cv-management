import { createContext, useContext, useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async (project) => {
    const created = await createProject(project);

    setProjects((prev) => [...prev, created]);
  };

  const editProject = async (id, project) => {
    const updated = await updateProject(id, project);

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  };

  const removeProject = async (id) => {
    await deleteProject(id);

    setProjects((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loadProjects,
        addProject,
        editProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);