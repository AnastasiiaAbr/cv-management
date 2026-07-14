const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");

    const error = new Error("Unauthorized");
    error.status = 401;

    throw error;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load profile");
  }

  return data;
};