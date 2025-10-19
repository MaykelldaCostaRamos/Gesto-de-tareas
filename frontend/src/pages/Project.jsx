// pages/Project.jsx
import React, { useState } from "react";
import { CheckCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";

const proyectosEjemplo = {
  1: {
    nombre: "Proyecto Alpha",
    tareas: [
      { id: 1, nombre: "Comprar material", estado: "pendiente" },
      { id: 2, nombre: "Revisar reporte", estado: "completada" },
      { id: 3, nombre: "Enviar email", estado: "pendiente" },
      { id: 4, nombre: "Reunión equipo", estado: "pendiente" },
      { id: 5, nombre: "Actualizar documento", estado: "completada" },
    ],
  },
};

export default function Project() {
  const { id } = useParams();
  const proyecto = proyectosEjemplo[id];
  const [tareas, setTareas] = useState(proyecto ? proyecto.tareas : []);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [archivos, setArchivos] = useState([]);

  if (!proyecto) return <p>Proyecto no encontrado</p>;

  const toggleEstado = (taskId) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, estado: t.estado === "pendiente" ? "completada" : "pendiente" }
          : t
      )
    );
  };

  const agregarTarea = () => {
    if (!nuevaTarea) return;
    const nueva = { id: Date.now(), nombre: nuevaTarea, estado: "pendiente" };
    setTareas((prev) => [...prev, nueva]);
    setNuevaTarea("");
  };

  const subirArchivos = () => {
    // Placeholder para lógica de backend
    alert(`${archivos.length} archivos listos para subir`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{proyecto.nombre}</h2>

      {/* Formulario para agregar tarea */}
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={agregarTarea}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tareas.map((tarea) => (
          <div
            key={tarea.id}
            className={`p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between transition transform hover:scale-105 max-w-full`}
          >
            <div className="flex items-start sm:items-center space-x-3 mb-2 sm:mb-0 flex-1">
              {tarea.estado === "completada" ? (
                <CheckCircleIcon className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              ) : (
                <PencilSquareIcon className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-600" />
              )}
              <span className={tarea.estado === "completada" ? "line-through font-semibold break-words" : "font-semibold break-words"}>
                {tarea.nombre}
              </span>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition">
                <PencilSquareIcon className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition">
                <TrashIcon className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => toggleEstado(tarea.id)}
                className={`px-3 py-1 rounded-lg text-white font-medium transition ${
                  tarea.estado === "completada"
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-green-400 hover:bg-green-500"
                }`}
              >
                {tarea.estado === "completada" ? "Pendiente" : "Completada"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de archivos */}
      <section className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Archivos del proyecto</h3>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="file"
            multiple
            className="border p-2 rounded-lg"
            onChange={(e) => setArchivos([...e.target.files])}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
            onClick={subirArchivos}
          >
            Subir Archivos
          </button>
        </div>

        {/* Lista de archivos seleccionados */}
        <ul className="mt-2 list-disc list-inside">
          {archivos.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
