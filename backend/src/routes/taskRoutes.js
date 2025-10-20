import express from "express";
import { createTask, getTasksByProject, updateTask, deleteTask } from "../controllers/taskController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Crear tarea
router.post("/", verifyToken, createTask);

// Obtener tareas de un proyecto
router.get("/:projectId", verifyToken, getTasksByProject);

// Actualizar tarea
router.put("/:id", verifyToken, updateTask);

// Eliminar tarea
router.delete("/:id", verifyToken, deleteTask);

export default router;
