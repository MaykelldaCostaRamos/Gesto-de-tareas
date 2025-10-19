// components/Layout.jsx
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Layout() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Aquí iría la lógica de logout (limpiar token, redirigir, etc.)
    console.log("Logout ejecutado");
    setOpen(false); // cierra el drawer en móvil
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col">
        <h2 className="text-xl font-bold mb-6">Gestor de Tareas</h2>
        <nav className="space-y-3 flex-1 flex flex-col">
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/project/1"
            className="block px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Proyectos
          </Link>

          {/* Spacer para empujar el botón de logout al final */}
          <div className="flex-1"></div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Drawer para móvil */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-30"
          onClick={() => setOpen(false)}
        ></div>
        <div className="relative w-64 bg-white h-full shadow-md p-6 flex flex-col">
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold mb-6">Gestor de Tareas</h2>
          <nav className="space-y-3 flex-1 flex flex-col">
            <Link
              to="/dashboard"
              className="block px-4 py-2 rounded hover:bg-blue-100 transition"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/project/1"
              className="block px-4 py-2 rounded hover:bg-blue-100 transition"
              onClick={() => setOpen(false)}
            >
              Proyectos
            </Link>

            {/* Spacer */}
            <div className="flex-1"></div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar móvil */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-semibold">Mi Panel</h1>
          <button onClick={() => setOpen(true)}>
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          </button>
        </header>

        {/* Contenido de las páginas */}
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
