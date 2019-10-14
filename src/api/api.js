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
