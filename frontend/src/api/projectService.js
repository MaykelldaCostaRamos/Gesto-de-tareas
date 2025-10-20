// api/projectService.js
import api from "./axios";

// ===== PROYECTOS =====

// Obtener todos los proyectos del usuario
export const getProjects = async () => {
  const response = await api.get("/project");
  return response.data;
};

// Obtener proyecto específico con tareas
export const getProject = async (projectId) => {
  const response = await api.get(`/project/${projectId}`);
  return response.data;
};

// Crear nuevo proyecto
export const createProject = async (name) => {
  const response = await api.post("/project", { name });
  return response.data;
};

// ===== TAREAS =====

// Crear nueva tarea en un proyecto
export const createTask = async (projectId, name) => {
  const response = await api.post(`/task/${projectId}`, { name });
  return response.data;
};

// Cambiar estado de una tarea (pendiente <-> completada)
export const toggleTaskState = async (taskId) => {
  const response = await api.put(`/task/${taskId}/toggle`);
  return response.data;
};

// Eliminar tarea por ID
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/task/${taskId}`);
  return response.data;
};
