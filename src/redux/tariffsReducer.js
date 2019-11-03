import produce from "immer";
import {
  changeTariffInfoAPI,
  changeTariffStatusApi,
  createTariffAPI,
  deleteTariffAPI,
  getAllTariffsAPI,
  getTariffsAPI,
  getTariffsStatAPI
} from "../api/api";

const SET_TARIFFS = "SET_TARIFFS",
  CHANGE_TARIFF_STATUS = "CHANGE_TARIFF_STATUS",
  SET_TARIFFS_STAT = "SET_TARIFFS_STAT",
  SET_ALL_TARIFFS = "SET_ALL_TARIFFS",
  CHANGE_TARIFF_INFO = "CHANGE_TARIFF_INFO",
  DELETE_TARIFF = "DELETE_TARIFF",
  CREATE_TARIFF = "CREATE_TARIFF";

let initialState = {
  tariffs: [],
  tariffsStat: [],
  allTariffs: []
};

let index;

const tariffsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TARIFFS:
        draft.tariffs = action.tariffs;
        draft.tariffId = action.tariffId;

        draft.tariffs.forEach((elem, i) => {
          elem.connected = action.tariffId === i + 1;
        });
        //draft.tariffId = action.tariffId;
        break;
      case SET_TARIFFS_STAT:
        draft.tariffsStat = action.tariffsStat;
        break;
      case SET_ALL_TARIFFS:
        draft.allTariffs = action.allTariffs;
        break;
      case CHANGE_TARIFF_INFO:
        index = draft.allTariffs.findIndex(
            elem => elem.Tariff_Id === action.tariffId
        );
        draft.allTariffs[index].Tariff_Name = action.tariffName;
        draft.allTariffs[index].Tariff_MaxSpeed = action.tariffSpeed;
        draft.allTariffs[index].Tariff_Price = action.tariffPrice;
        break;
      case CREATE_TARIFF:
        draft.allTariffs.push({
          Tariff_Id: action.tariffId,
          Tariff_Name: action.tariffName,
          Tariff_MaxSpeed: action.tariffSpeed,
          Tariff_Price: action.tariffPrice
        });
        break;
      case DELETE_TARIFF:
        index = draft.allTariffs.findIndex(
          elem => elem.Tariff_Id === action.tariffId
        );
        draft.allTariffs.splice(index, 1);
        break;
      case CHANGE_TARIFF_STATUS:
        /*if (draft.tariffId === action.tariffId) draft.tariffId = null;
        else if (!draft.tariffId) draft.tariffId = action.tariffId;*/
        index = draft.tariffs.findIndex(elem => elem.connected);
        if (index === -1) {
          draft.tariffs[draft.tariffs.findIndex(elem => elem.Tariff_Id === action.tariffId)].connected = true;
          //draft.tariffs[action.tariffId - 1].connected = true;
          draft.tariffId = action.tariffId;
        } /*else if (index === action.tariffId - 1) {
          draft.tariffs[action.tariffId - 1].connected = false;
          draft.tariffId = null;
        }*/
        else {
          draft.tariffs[draft.tariffs.findIndex(elem => elem.Tariff_Id === action.tariffId)].connected = false;
          draft.tariffId = null;
        }
        break;
    }
  });

const setTariffStatus = tariffId => ({
  type: CHANGE_TARIFF_STATUS,
  tariffId
});

const setTariffs = (tariffs, tariffId) => ({
  type: SET_TARIFFS,
  tariffs,
  tariffId
});

const setTariffsStat = tariffsStat => ({
  type: SET_TARIFFS_STAT,
  tariffsStat
});

const setAllTariffs = allTariffs => ({
  type: SET_ALL_TARIFFS,
  allTariffs
});

const changeTariffInfoAC = (tariffId, tariffName, tariffSpeed, tariffPrice) => ({
  type: CHANGE_TARIFF_INFO,
  tariffId,
  tariffName,
  tariffSpeed,
  tariffPrice
});

const createTariffAC = (tariffId, tariffName, tariffSpeed, tariffPrice) => ({
  type: CREATE_TARIFF,
  tariffId,
  tariffName,
  tariffSpeed,
  tariffPrice
});

const deleteTariffAC = tariffId => ({
  type: DELETE_TARIFF,
  tariffId
});

export const changeTariffStatus = tariffId => async dispatch => {
  debugger
/*  if(
      !initialState.tariffs.tariffId ||
  )*/
// if (est yzhe est tarif and tariff != dispatch(tariff))
  if (
    !(
      initialState.tariffs.tariffId &&
      initialState.tariffs.tariffId !== tariffId
    )
  ) {
    let response = await changeTariffStatusApi(tariffId);
    if (response.resultCode === 0) dispatch(setTariffStatus(tariffId));
  }
};

export const requestAllTariffs = () => async dispatch => {
  let response = await getAllTariffsAPI();
  if (response.resultCode === 0) {
    let { tariffs } = response;
    dispatch(setAllTariffs(tariffs));
  }
};

export const requestTariffs = () => dispatch => {
  getTariffsAPI().then(response => {
    if (response.resultCode === 0) {
      let { tariffs, tariffId } = response;
      dispatch(setTariffs(tariffs, tariffId));
    }
  });
};

export const requestTariffsStat = () => async dispatch => {
  let response = await getTariffsStatAPI();
  if (response.resultCode === 0) {
    let { tariffs } = response;
    dispatch(setTariffsStat(tariffs));
  }
};

export const changeTariffInfo = (
  tariffId,
  tariffName,
  tariffSpeed,
  tariffPrice
) => async dispatch => {
  let response = await changeTariffInfoAPI(
    tariffId,
    tariffName,
    tariffSpeed,
    tariffPrice
  );
  if (response.resultCode === 0) {
    //let { tariffs } = response;
    dispatch(changeTariffInfoAC(tariffId, tariffName, tariffSpeed, tariffPrice));
  }
};

export const createTariff = (
  tariffName,
  tariffSpeed,
  tariffPrice
) => async dispatch => {
  debugger;
  let response = await createTariffAPI(tariffName, tariffSpeed, tariffPrice);
  if (response.resultCode === 0)
  dispatch(
    createTariffAC(response.tariffId, tariffName, tariffSpeed, tariffPrice)
  );
};

export const deleteTariff = tariffId => async dispatch => {
  let response = await deleteTariffAPI(tariffId);
  if (response.resultCode === 0) dispatch(deleteTariffAC(tariffId));
};

export default tariffsReducer;
