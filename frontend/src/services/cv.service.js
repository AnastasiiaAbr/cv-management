import { apiRequest } from "./api";

export const createCV = async (cv) =>
  apiRequest("/cvs", {
    method: "POST",
    body: JSON.stringify(cv),
  });

export const updateCV = async (id, cv) =>
  apiRequest(`/cvs/${id}`, {
    method: "PUT",
    body: JSON.stringify(cv),
  });

export const deleteCV = async (id) =>
  apiRequest(`/cvs/${id}`, {
    method: "DELETE",
  });

export const getCVById = async (id) =>
  apiRequest(`/cvs/${id}`);

export const getCVs = async () =>
  apiRequest("/cvs");

export const getMyCVByPosition = async (positionId) => {
  return apiRequest(`/cvs/position/${positionId}`);
};