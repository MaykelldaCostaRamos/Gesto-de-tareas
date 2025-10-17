import fetch from "node-fetch";

// Reemplaza este token por uno válido obtenido al hacer login
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGVjMGFlNWEwNjgwZDY3ZTEwNTAxODciLCJuYW1lIjoiTWF5a2VsbCIsImlhdCI6MTc2MDQyMzMyMCwiZXhwIjoxNzYwNTA5NzIwfQ.UwQirArLRk3_6tI2bbi1uSWAOo3Pbdoi6cWFzdQmC5Y'
// Reemplaza con el _id de un proyecto existente en tu base de datos
const PROJECT_ID = "6512ab3f6e5b4c1a23f45678";

const BASE_URL = "http://127.0.0.1:4000/api/tasks";

const testTask = async () => {
  try {
    // 1️⃣ Crear tarea
    const newTask = {
      title: "Tarea de prueba",
      description: "Descripción de prueba",
      status: "pendiente",
      projectId: PROJECT_ID,
      assignedTo: ['68ec0ae5a0680d67e1050187'] // IDs de usuarios asignados (opcional)
    };

    const createResp = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify(newTask)
    });
    const createdTask = await createResp.json();
    if (!createdTask.task) {
      console.error("Error al crear la tarea:", createdTask);
      return;
    }
    console.log("Tarea creada:", createdTask);

    const taskId = createdTask.task._id;

    // 2️⃣ Obtener tareas del proyecto
    const getResp = await fetch(`${BASE_URL}/${PROJECT_ID}`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    const tasks = await getResp.json();
    console.log("Tareas del proyecto:", tasks);

    // 3️⃣ Actualizar tarea
    const updateResp = await fetch(`${BASE_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ status: "completada" })
    });
    const updatedTask = await updateResp.json();
    console.log("Tarea actualizada:", updatedTask);

    // 4️⃣ Eliminar tarea
    const deleteResp = await fetch(`${BASE_URL}/${taskId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    const deletedTask = await deleteResp.json();
    console.log("Tarea eliminada:", deletedTask);

  } catch (error) {
    console.error("Error en testTask:", error);
  }
};

testTask();
