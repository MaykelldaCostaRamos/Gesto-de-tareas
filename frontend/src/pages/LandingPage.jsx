// pages/LandingPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import mockup from '../assets/mockup-nouteam.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-blue-600"
        >
          Gestor de Tareas
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-x-4"
        >
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Registro
          </Link>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col lg:flex-row items-center px-8 lg:px-24 py-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2 space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Organiza tus proyectos y tareas de manera eficiente
          </h2>
          <p className="text-gray-600 text-lg">
            Mantén tus tareas bajo control, visualiza tu progreso y aumenta tu productividad.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Empieza ahora
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <img src={mockup} className="rounded-2xl shadow-lg w-90 h-auto"/>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 lg:px-24 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">Funcionalidades</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: ClipboardDocumentIcon,
              color: "text-blue-500",
              title: "Organiza tus proyectos",
              text: "Crea y gestiona todos tus proyectos en un solo lugar.",
            },
            {
              icon: CheckCircleIcon,
              color: "text-green-500",
              title: "Mantén tus tareas al día",
              text: "Marca tareas completadas y sigue tu progreso fácilmente.",
            },
            {
              icon: ClockIcon,
              color: "text-yellow-500",
              title: "Visualiza tu progreso",
              text: "Revisa estadísticas y avances de tus proyectos rápidamente.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center space-y-4"
            >
              <feature.icon className={`w-12 h-12 ${feature.color}`} />
              <h4 className="font-semibold text-xl">{feature.title}</h4>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 bg-blue-50 text-center"
      >
        <h3 className="text-3xl font-bold mb-4">¿Listo para organizar tus tareas?</h3>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Regístrate ahora
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 bg-white text-center text-gray-500 text-sm">
        &copy; 2025 Gestor de Tareas. Todos los derechos reservados.
      </footer>
    </div>
  );
}
