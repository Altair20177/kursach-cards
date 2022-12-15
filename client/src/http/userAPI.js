import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, login, name, surname) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    login,
    name,
    surname,
    userRole: "user",
  });
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", jwt_decode(data.token).id);
  return jwt_decode(data.token);
};

export const logIn = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", jwt_decode(data.token).id);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const fetchAdmins = async () => {
  const { data } = await $authHost.get("api/user/admins");
  return data;
};

export const fetchRequestToAdmin = async () => {
  const { data } = await $authHost.get("api/request");
  return data;
};

export const acceptRequestToAdmin = async (id) => {
  const { data } = await $authHost.get("api/request/accept/" + id);
  return data;
};

export const rejectRequestToAdmin = async (id) => {
  const { data } = await $authHost.get("api/request/reject/" + id);
  return data;
};
