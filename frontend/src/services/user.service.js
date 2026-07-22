import { apiRequest } from "./api";

export const getCurrentUser = async () => {
  return await apiRequest("/auth/me");
};

export const getUsers = async () => {
  return await apiRequest("/users");
};

export const getUser = async (id) => {
  return await apiRequest(`/users/${id}`);
};

export const updateUser = async (id, user) => {
  return await apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
};

export const updateUserRole = async (id, role) => {
  return await apiRequest(`/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
};

export const deleteUser = async (id) => {
  return await apiRequest(`/users/${id}`, {
    method: "DELETE",
  });
};