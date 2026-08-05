import { BASE_URL } from "./constants";

const baseUrl = BASE_URL;

const getHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
};
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (itemID) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: getHeaders(token),
  }).then(handleServerResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: getHeaders(token),
  }).then(handleServerResponse);
};

export const removeCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: getHeaders(token),
  }).then(handleServerResponse);
};

export const updateUserProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(handleServerResponse);
};
