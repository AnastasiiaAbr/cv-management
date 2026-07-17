const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const getPositions = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/positions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load attributes");
  }

  return data;
};

export const createPosition = async (positionData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/positions`, {
    method: 'POST',
    headers: {
      'Content-type': 'application.json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(positionData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create attribute");
    }

    return data;
};

export const updateAttribute = async (id, positionData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/positions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(positionData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update positions");
  }

  return data;
};

export const deleteAttribute = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/positions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete position");
  }

  return data;
};