import api from "./axios";

// Registro sigue igual, no devuelve token
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Login devuelve token
// authService.js
export const loginUser = async ({ email, password }) => {
  const res = await fetch("/auth/login", {  // <-- aquí se apunta al backend
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return await res.json();
};


export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  console.log("Saliendo de la APP: ", response.data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
