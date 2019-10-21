import * as axios from "axios";

const instance = axios.create({
  headers: {
    "x-access-token": localStorage.getItem("token")
  }
});

export const authMe = () => {
  debugger;
  return instance.get("http://localhost:1337/auth/me");
};

export const loginAPI = (login, password, rememberMe) => {
  return instance.post("http://localhost:1337/login", {
    login,
    password,
    rememberMe
  });
};

export const logoutAPI = () => {
  return instance.delete("http://localhost:1337/logout");
};

export const getTariffsAPI = () => {
  return instance
    .get(`http://localhost:1337/tariffs`)
    .then(response => {
      debugger;
      console.log(JSON.stringify(response.data.headers));
      return response.data.data});
};

export const getServices = () => {
  return instance
    .get("http://localhost:1337/services")
    .then(response => response.data);
};

export const changeTariffStatusApi = tariffId => {
  return instance
    .put("http://localhost:1337/tariffs", { tariffId })
    .then(response => response.data.data);
};
