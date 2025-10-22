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
export const createProject = async (name, description) => {
  const response = await api.post("/project", { name, description });
  return response.data;
};

// Editar proyecto
export const updateProject = async (projectId, name, description) => {
  const response = await api.put(`/project/${projectId}`, { name, description });
  return response.data.project;
};

// Eliminar proyecto
export const deleteProject = async (projectId) => {
  const response = await api.delete(`/project/${projectId}`);
  return response.data;
};

// ===== TAREAS =====

// Crear nueva tarea en un proyecto
export const createTask = async (projectId, title, description = "") => {
  const response = await api.post(`/task/${projectId}`, { title, description});
  return response.data.data;
};

// Cambiar estado de una tarea (pendiente <-> completada)
export const toggleTaskState = async (taskId) => {
  const response = await api.put(`/task/${taskId}/toggle`);
  return response.data.data;
};

// Actualizar tarea por ID
export const updateTask = async (taskId, data) => {
  const response = await api.put(`/task/${taskId}`, data);
  return response.data.data;
};

// Eliminar tarea por ID
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/task/${taskId}`);
  return response.data;
};
