import { apiRequest } from "./api";

export const getAttributes = () =>
  apiRequest("/attributes");

export const createAttribute = (attribute) =>
  apiRequest("/attributes", {
    method: "POST",
    body: JSON.stringify(attribute),
  });

export const updateAttribute = (id, attribute) =>
  apiRequest(`/attributes/${id}`, {
    method: "PUT",
    body: JSON.stringify(attribute),
  });

export const deleteAttribute = (id) =>
  apiRequest(`/attributes/${id}`, {
    method: "DELETE",
  });