import api from "./axios";

// Registro (no devuelve token)
export const registerUser = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// Login (devuelve token y se guarda en localStorage)
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");

  // 👉 Guarda el token en localStorage
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

// Logout (elimina token del localStorage)
export const logoutUser = async () => {
  localStorage.removeItem("token");
  // Opcional: notificar al backend
  // await api.post("/api/auth/logout");
};

// Perfil (usa axios con interceptor que enviará el token automáticamente)
export const getProfile = async () => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};
