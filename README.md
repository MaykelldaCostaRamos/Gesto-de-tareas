# Gestor de Tareas Colaborativo (Fullstack – 21 días)

[![Frontend](https://img.shields.io/badge/React-Vite-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Gestor de Tareas colaborativo**, desarrollado siguiendo un roadmap de 21 días, que permite crear proyectos, gestionar tareas y trabajar en equipo de manera eficiente.

---

## Características principales

- Autenticación segura con JWT  
- Gestión de proyectos y tareas por usuario  
- Roles: propietario y colaboradores  
- CRUD completo en backend y frontend  
- Drag & Drop para organizar tareas  
- Notificaciones en tiempo real con Toasts  

---

## Tecnologías

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt  
**Frontend:** React, Vite, TailwindCSS, Zustand/Context API, Axios  
**Extras:** React Router, react-hot-toast / sonner, (Opcional) Socket.io  

---

## Estructura del proyecto

Roadmap_Gestor_Tareas_21Dias/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middlewares/
│ │ ├── models/
│ │ ├── routes/
│ │ └── server.js
│ ├── .env 
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── routes/
│ │ ├── hooks/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── tailwind.config.js
│ └── package.json
└── README.md

---

## Endpoints principales

### Usuarios
- **POST /auth/register** → Registrar usuario
- **POST /auth/login** → Login
- **GET /auth/profile** → Obtener perfil (requiere token)

### Proyectos
- **POST /projects** → Crear proyecto
- **GET /projects** → Listar proyectos del usuario
- **PUT /projects/:id** → Actualizar proyecto
- **DELETE /projects/:id** → Eliminar proyecto

### Tareas
- **POST /tasks** → Crear tarea
- **GET /tasks/:projectId** → Listar tareas del proyecto
- **PUT /tasks/:id** → Actualizar tarea
- **DELETE /tasks/:id** → Eliminar tarea

## Autenticación
- Todas las rutas de proyectos y tareas requieren header:



## Postman Collection
Puedes importar la colección de Postman para probar todos los endpoints:  
[Descargar colección](./API%20Gestor%20de%20Tareas.postman_collection.json)

