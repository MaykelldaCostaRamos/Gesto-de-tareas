import mongoose from "mongoose";
import Project from "../models/Project.js";

// Validadores
const validateName = (name) =>
  typeof name === "string" && name.trim().length >= 3 && name.trim().length <= 100;

const cleanText = (text) => (typeof text === "string" ? text.trim() : "");

// Crear proyecto
export const createProject = async (req, res) => {
  try {
    const name = cleanText(req.body.name);
    const description = cleanText(req.body.description);

    if (!validateName(name)) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "El nombre del proyecto es obligatorio y debe tener entre 3 y 100 caracteres",
        });
    }

    // Evitar nombres duplicados por usuario
    const existing = await Project.findOne({ name, ownerId: req.user.userId });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Ya existe un proyecto con este nombre" });
    }

    const newProject = await Project.create({
      name,
      description,
      ownerId: req.user.userId,
    });

    res
      .status(201)
      .json({ success: true, message: "Proyecto creado con éxito", project: newProject });
  } catch (error) {
    console.error("Error en createProject:", error.message);
    res.status(500).json({ success: false, message: "Error al crear el proyecto" });
  }
};

// Obtener proyectos del usuario
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    console.error("Error en getProjects:", error.message);
    res.status(500).json({ success: false, message: "Error al obtener los proyectos" });
  }
};

// Actualizar proyecto
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const name = cleanText(req.body.name);
    const description = cleanText(req.body.description);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID de proyecto inválido" });
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, ownerId: req.user.userId },
      { name, description },
      { new: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Proyecto no encontrado o no autorizado" });
    }

    res.json({ success: true, message: "Proyecto actualizado correctamente", project });
  } catch (error) {
    console.error("Error en updateProject:", error.message);
    res.status(500).json({ success: false, message: "Error al actualizar el proyecto" });
  }
};

// Eliminar proyecto
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID de proyecto inválido" });
    }

    const project = await Project.findOneAndDelete({
      _id: id,
      ownerId: req.user.userId,
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Proyecto no encontrado o no autorizado" });
    }

    res.json({ success: true, message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteProject:", error.message);
    res.status(500).json({ success: false, message: "Error al eliminar el proyecto" });
  }
};
