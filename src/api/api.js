import * as axios from "axios";

/*
let instance;

export let initializeInstance = () => {
    instance = axios.create({
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    });
};
*/
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

/*
export const authMe = () => {
  return axios.get("http://localhost:1337/auth/me", {
      headers: {
          "x-access-token": localStorage.getItem("token")
      }
  });
};
*/

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

/*export const getTariffsAPI = () => {
  return axios
      .get(`http://localhost:1337/tariffs`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(response => response.data.data);
};*/


/*export const getServices = () => {
  return axios
    .get("http://localhost:1337/services", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(response => response.data);
};*/

export const getServicesAPI = () => {
  return axios
    .get("http://localhost:1337/services")
    .then(response => response.data);
};

/*
export const changeTariffStatusApi = tariffId => {
  return instance
    .put("http://localhost:1337/tariffs", { tariffId })
    .then(response => response.data.data);
};
*/

/*
export const changeTariffStatusApi = tariffId => {
  return axios
      .put("http://localhost:1337/tariffs", { tariffId },{
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(response => response.data.data);
};
*/

export const changeTariffStatusApi = tariffId => {
  return axios
      .put("http://localhost:1337/tariffs", { tariffId })
      .then(response => response.data.data);
};
