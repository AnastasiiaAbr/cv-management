const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const getAttributes = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/attributes`, {
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

export const createAttribute = async (attributeData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/attributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attributeData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create attribute");
  }

  return data;
};