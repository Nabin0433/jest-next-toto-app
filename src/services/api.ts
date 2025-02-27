const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  return await response.json();
};

export const getTask = async (id: string) => {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  return await response.json();
};

export const createTask = async (title: string, color: string) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, color }),
  });
  return await response.json();
};

export const updateTask = async (todo: Todo) => {
  const response = await fetch(`${API_URL}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todo.title, color: todo.color, completed: todo.completed }),
  });
  return await response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
