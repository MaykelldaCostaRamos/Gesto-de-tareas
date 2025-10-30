import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../api/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) { setError("El email es obligatorio"); return false; }
    if (!emailRegex.test(email)) { setError("El email no es válido"); return false; }
    if (!password) { setError("La contraseña es obligatoria"); return false; }
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres"); return false; }
    setError(""); 
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await loginUser({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4">
      <div className="mt-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Nou<span className="font-light">team</span></h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mt-16 mb-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Inicia sesión</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105">Login</button>
        </form>

        <div className="text-center mt-4 text-gray-500 text-sm space-y-1">
          <p>
            ¿No tienes cuenta? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Regístrate</Link>
          </p>
          <p>
            <Link to="/" className="text-blue-600 hover:underline">Volver a inicio</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
