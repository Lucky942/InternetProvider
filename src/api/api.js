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

export const authMe = () => {
  debugger;
  return axios.get("http://localhost:1337/auth/me", {
      headers: {
          "x-access-token": localStorage.getItem("token")
      }
  });
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

/*export const getTariffsAPI = () => {
  return instance
    .get(`http://localhost:1337/tariffs`)
    .then(response => {
      debugger;
      console.log(JSON.stringify(response.data.headers));
      return response.data.data});
};*/

export const getTariffsAPI = () => {
  return axios
      .get(`http://localhost:1337/tariffs`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(response => response.data.data);
};


export const getServices = () => {
  return axios
    .get("http://localhost:1337/services", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(response => response.data);
};

/*
export const changeTariffStatusApi = tariffId => {
  return instance
    .put("http://localhost:1337/tariffs", { tariffId })
    .then(response => response.data.data);
};
*/

export const changeTariffStatusApi = tariffId => {
  return axios
      .put("http://localhost:1337/tariffs", { tariffId },{
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(response => response.data.data);
};
