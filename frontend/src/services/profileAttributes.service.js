import { apiRequest } from "./api";

const BASE_URL = "/profile-attributes";

export const getProfileAttributes = () =>
  apiRequest(BASE_URL);

export const createProfileAttribute = (data) =>
  apiRequest(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateProfileAttribute = (id, data) =>
  apiRequest(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteProfileAttribute = (id) =>
  apiRequest(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });