import * as axios from "axios";

const instance = axios.create({
  headers: {
    "x-access-token": localStorage.getItem('token'),
    "clientId": localStorage.getItem('clientId')
  }
});


export const loginAPI = (login, password, rememberMe) => {
  return axios
      .post("http://localhost:1337/login", {login, password, rememberMe})
};

export const logoutAPI = () => {
  return axios
      .delete("http://localhost:1337/logout");
};

export const getTariffsAPI = () => {
  return instance
    .get(`http://localhost:1337/tariffs`)
    .then(response => response.data.data);
};

export const getServices = () => {
  return instance
    .get("http://localhost:1337/services")
    .then(response => response.data);
};

export const changeTariffStatusApi = (clientId, tariffId) => {
  return axios
      .put("")

}