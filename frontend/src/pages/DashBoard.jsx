// pages/Dashboard.jsx
import React from "react";
import { PencilIcon, TrashIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const proyectosEjemplo = [
  { id: 1, nombre: "Proyecto Alpha", tareasPendientes: 5, tareasCompletadas: 10 },
  { id: 2, nombre: "Proyecto Beta", tareasPendientes: 2, tareasCompletadas: 3 },
  { id: 3, nombre: "Proyecto Gamma", tareasPendientes: 7, tareasCompletadas: 1 },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Header con botón Nuevo Proyecto */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Tus Proyectos</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
          + Nuevo Proyecto
        </button>
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectosEjemplo.map((proyecto) => (
          <div
            key={proyecto.id}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <ClipboardDocumentListIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
              <h3 className="text-lg sm:text-xl font-semibold">{proyecto.nombre}</h3>
            </div>

            <p className="text-sm sm:text-base">
              Tareas pendientes: <span className="font-medium">{proyecto.tareasPendientes}</span>
            </p>
            <p className="text-sm sm:text-base">
              Tareas completadas: <span className="font-medium">{proyecto.tareasCompletadas}</span>
            </p>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-2 mt-4">
              <button className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition">
                <PencilIcon className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition">
                <TrashIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
