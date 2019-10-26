import * as axios from "axios";

/*
const instance = axios.create({
  headers: {
    "x-access-token": localStorage.getItem("token")
  }
});*/

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem("token");

    if ( token != null ) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
}, function(err) {
    return Promise.reject(err);
});

export const authMe = () => {
  return axios.get("http://localhost:1337/auth/me");
};

export const loginAPI = (login, password, rememberMe) => {
  return axios.post("http://localhost:1337/login", {
    login,
    password,
    rememberMe
  });
};

export const logoutAPI = () => {
  return axios.delete("http://localhost:1337/logout");
};

export const getTariffsAPI = () => {
  return axios
    .get(`http://localhost:1337/tariffs`)
    .then(response => {
      return response.data.data});
};

export const getServicesAPI = () => {
  return axios
    .get("http://localhost:1337/services")
    .then(response => response.data);
};

export const changeTariffStatusApi = tariffId => {
  return axios
      .put("http://localhost:1337/tariffs", { tariffId })
      .then(response => response.data.data);
};

export const getTariffsStatAPI = async () => {
    let response = await axios.get("http://localhost:1337/tariffsstat");
    return response.data.data;
};

export const getStaffAPI = async () => {
    let response = await axios.get("http://localhost:1337/staff")
    return response.data.data;
};
