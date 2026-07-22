const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });


  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}