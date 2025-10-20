
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjects, createProject } from "../api/projectService";

export default function Dashboard() {
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState("");

  // Cargar proyectos del usuario
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(); // data = { success, projects }
        setProyectos(data.projects || []); // usar solo el array de proyectos
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      }
    };
    fetchProjects();
  }, []);

  // Crear nuevo proyecto
  const handleCrearProyecto = async () => {
    if (!nuevoProyecto) return;
    try {
      const response = await createProject(nuevoProyecto); // response = { success, project }
      setProyectos((prev) => [...prev, response.project]);
      setNuevoProyecto("");
    } catch (error) {
      console.error("Error al crear proyecto:", error);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header con botón Nuevo Proyecto */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Tus Proyectos</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={nuevoProyecto}
            onChange={(e) => setNuevoProyecto(e.target.value)}
            placeholder="Nombre del proyecto"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCrearProyecto}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            + Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos.map((project) => (
          <Link
            key={project._id}
            to={`/project/${project._id}`}
            className="p-4 bg-white shadow rounded-2xl hover:shadow-xl transition transform hover:scale-105"
          >
            <h3 className="font-bold text-lg">{project.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
