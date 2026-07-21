const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

const getToken = () => {
  return localStorage.getItem('token');
}

export const getProfile = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "Failed to load profile");
    error.status = response.status;
    throw error;
  }

  return result;
};

export const updateProfile = async (data) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "Failed to update profile");
    error.status = response.status;
    throw error;
  }

  return result
}