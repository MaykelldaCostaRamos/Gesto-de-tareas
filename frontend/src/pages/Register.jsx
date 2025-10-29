import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return false;
    }
    if (name.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("El email es obligatorio");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("El email no es válido");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!password) {
      setError("La contraseña es obligatoria");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número"
      );
      return false;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userData = await registerUser({ name, email, password });
      console.log("Registro exitoso:", userData);

      // ⚡ Redirige al login y opcionalmente limpiar form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4">
      <div className="mt-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Gestor de Tareas</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mt-16 mb-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Crea tu cuenta
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="tucorreo@ejemplo.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Registrarse
          </button>
        </form>

        <div className="text-center mt-4 text-gray-500 text-sm space-y-1">
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to='/login' className="text-blue-600 font-semibold hover:underline"> Inicia sesión </Link>
          </p>
          <p>
            <Link to='/' className="text-blue-600 hover:underline"> Volver a inicio </Link>             
          </p>
        </div>
      </motion.div>
    </div>
  );
}
