import api from "./axios";

// Registro (no devuelve token)
export const registerUser = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// Login devuelve token
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");

  // 👉 Guarda el token en localStorage
  localStorage.setItem("token", data.token);

  return data;
};


export const logoutUser = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/api/auth/profile");
  return response.data;
};
