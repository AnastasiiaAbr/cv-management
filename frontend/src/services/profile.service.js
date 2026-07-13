const API_URL = "https://cv-management-back.onrender.com/";

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};