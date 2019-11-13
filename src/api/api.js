import * as axios from "axios";

/*
const instance = axios.create({
  headers: {
    "x-access-token": localStorage.getItem("token")
  }
});*/

axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");

    if (token != null) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export const authMe = () => {
  return axios.get("http://localhost:1337/auth/me");
};

export const loginAPI = (login, password) => {
  return axios.post("http://localhost:1337/login", {
    login,
    password
  });
};

export const signUpAPI = (login, password, rememberMe) => {
  return axios.post("http://localhost:1337/signup", {
    login,
    password,
    rememberMe
  });
};

export const createNewClientAPI = async (
  firstName,
  lastName,
  passport,
  birthday
) => {
  let response = await axios.post("http://localhost:1337/createnewclient", {
    firstName,
    lastName,
    passport,
    birthday
  });

  return response.data;
};

export const logoutAPI = () => {
  return axios.delete("http://localhost:1337/logout");
};

export const getTariffsAPI = () => {
  return axios.get(`http://localhost:1337/tariffs`).then(response => {
    return response.data.data;
  });
};

export const getServicesAPI = () => {
  return axios
    .get("http://localhost:1337/services")
    .then(response => response.data.data);
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

export const getAllTariffsAPI = async () => {
  let response = await axios.get("http://localhost:1337/alltariffs");

  return response.data.data;
};

export const getStaffAPI = async () => {
  let response = await axios.get("http://localhost:1337/staff");
  return response.data.data;
};

export const changeTariffInfoAPI = async (
  tariffId,
  tariffName,
  tariffSpeed,
  tariffPrice
) => {
  let response = await axios.put("http://localhost:1337/changetariffinfo", {
    tariffId,
    tariffName,
    tariffSpeed,
    tariffPrice
  });
  return response.data.data;
};

export const createTariffAPI = async (tariffName, tariffSpeed, tariffPrice) => {
  let response = await axios.post(`http://localhost:1337/createtariff`, {
    tariffName,
    tariffSpeed,
    tariffPrice
  });
  return response.data.data;
};

export const deleteTariffAPI = async tariffId => {
  let response = await axios.delete(
    `http://localhost:1337/deletetariff?tariffId=${tariffId}`
  );
  return response.data.data;
};

export const getAdminServicesAPI = async () => {
  let response = await axios.get("http://localhost:1337/services");
  return response.data.data;
};

// Mounter requests

export const getOrdersOfEquipmentStat = async year => {
  let response = await axios.get(
    `http://localhost:1337/equipmentstat?year=${year}`
  );
  return response.data.data;
};

export const getMountersYearReport = async year => {
  let response = await axios.get(
    `http://localhost:1337/mountersworkreport?year=${year}`
  );
  return response.data.data;
};

export const getLongestTimeMounter = async () => {
  let response = await axios.get("http://localhost:1337/longesttimemounter");
  return response.data.data;
};

export const getNoOrdersMounterInfo = async () => {
  let response = await axios.get("http://localhost:1337/noordersmounter");
  return response.data.data;
};

export const getExpensiveOrderMounterInfo = async year => {
  let response = await axios.get(
    `http://localhost:1337/expensiveordermounterinfo?year=${year}`
  );
  return response.data.data;
};

export const getNoOrdersMonthMounterInfo = async (year, month) => {
  let response = await axios.get(
    `http://localhost:1337/nomonthordersmounterinfo?year=${year}&month=${month}`
  );
  return response.data.data;
};

// userAccount request

export const getAccountInfoAPI = async () => {
  let response = await axios.get(
    `http://localhost:1337/account`
  );
  return response.data.data;
};
