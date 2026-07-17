import { apiRequest } from "./api";

export const getPositions = () =>
  apiRequest("/positions");

export const getPositionById = (id) =>
  apiRequest(`/positions/${id}`);

export const createPosition = (position) =>
  apiRequest("/positions", {
    method: "POST",
    body: JSON.stringify(position),
  });

export const updatePosition = (id, position) =>
  apiRequest(`/positions/${id}`, {
    method: "PUT",
    body: JSON.stringify(position),
  });

export const updatePositionAttributes = (id, attributeIds) =>
  apiRequest(`/positions/${id}/attributes`, {
    method: "PUT",
    body: JSON.stringify({ attributeIds }),
  });

export const deletePosition = (id) =>
  apiRequest(`/positions/${id}`, {
    method: "DELETE",
  });