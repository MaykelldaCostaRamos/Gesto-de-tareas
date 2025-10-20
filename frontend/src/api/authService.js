import api from "./axios";

// Registro sigue igual, no devuelve token
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Login devuelve token
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
