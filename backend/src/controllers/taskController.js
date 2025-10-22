import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

const cleanText = (text) => (typeof text === "string" ? text.trim() : "");

// Crear tarea
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { projectId } = req.params;

    if (!title || !projectId) {
      return res.status(400).json({ success: false, message: "Título y proyecto son obligatorios" });
    }

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ success: false, message: "ID de proyecto inválido" });
    }

    // Verificar que el proyecto pertenezca al usuario
    const project = await Project.findOne({ _id: projectId, ownerId: req.user.userId });
    if (!project) {
      return res.status(403).json({ success: false, message: "No tienes permiso para añadir tareas" });
    }

    const newTask = await Task.create({ title, description, projectId, status: "pendiente" });

    res.status(201).json({ success: true, message: "Tarea creada correctamente", data: newTask });
  } catch (error) {
    console.error("Error en createTask:", error.message);
    res.status(500).json({ success: false, message: "Error al crear la tarea" });
  }
};


// Obtener tareas de un proyecto
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "ID de proyecto inválido",
      });
    }

    const tasks = await Task.find({ projectId }).populate("assignedTo", "name email");

    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error en getTasksByProject:", error.message);
    res.status(500).json({ success: false, message: "Error al obtener las tareas" });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID de tarea inválido" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Tarea no encontrada" });
    }

    res.json({ success: true, message: "Tarea actualizada correctamente", data: updatedTask });
  } catch (error) {
    console.error("Error en updateTask:", error.message);
    res.status(500).json({ success: false, message: "Error al actualizar la tarea" });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID de tarea inválido" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Tarea no encontrada" });
    }

    res.json({ success: true, message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error en deleteTask:", error.message);
    res.status(500).json({ success: false, message: "Error al eliminar la tarea" });
  }
};

// Cambiar estado de una tarea (pendiente <-> completada)
export const toggleTaskState = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID de tarea inválido" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Tarea no encontrada" });
    }

    // Alternar estado
    task.status = task.status === "pendiente" ? "completada" : "pendiente";
    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    console.error("Error en toggleTaskState:", error.message);
    res.status(500).json({ success: false, message: "Error al cambiar el estado de la tarea" });
  }
};

