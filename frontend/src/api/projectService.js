import api from "./axios";

// Obtener proyecto con tareas
export const getProject = async (projectId) => {
  const response = await api.get(`/project/${projectId}`);
  return response.data;
};

// Crear nueva tarea
export const createTask = async (projectId, nombre) => {
  const response = await api.post(`/task/${projectId}`, { nombre });
  return response.data;
};

// Actualizar estado de tarea
export const toggleTaskState = async (taskId) => {
  const response = await api.put(`/task/${taskId}/toggle`);
  return response.data;
};
