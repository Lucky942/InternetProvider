import * as axios from "axios";

export const getTariffs = () => {
  return axios
    .get("http://localhost:1337/tariffs")
    .then(response => response.data);
};

export const getServices = () => {
  return axios
    .get("http://localhost:1337/services")
    .then(response => response.data);
};


export const loginAPI = (login, password, rememberMe) => {
  return axios
      .post("http://localhost:1337/auth/me", {login, password, rememberMe})
};

export const logoutAPI = () => {
  return axios
      .delete("http://localhost:1337/auth/me");
};