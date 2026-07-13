const API_URL = 'https://cv-management-back.onrender.com/';

export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}auth/register`, {
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