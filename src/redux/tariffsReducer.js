import produce from "immer";
import {
  changeTariffInfoAPI,
  changeTariffStatusApi, deleteTariffAPI,
  getAllTariffsAPI,
  getTariffsAPI,
  getTariffsStatAPI,
  loginAPI
} from "../api/api";

const SET_TARIFFS = "SET_TARIFFS",
  CHANGE_TARIFF_STATUS = "CHANGE_TARIFF_STATUS",
  SET_TARIFFS_STAT = "SET_TARIFFS_STAT",
  SET_ALL_TARIFFS = "SET_ALL_TARIFFS",
  CHANGE_TARIFF_INFO = "CHANGE_TARIFF_INFO",
  DELETE_TARIFF = "DELETE_TARIFF";

let initialState = {
  tariffs: [],
  tariffsStat: [],
  allTariffs: []
};

// const tariffsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_TARIFFS:
//       let stateCopy = { ...state };
//       stateCopy.tariffs = action.tariffs;
//       return stateCopy;
//     default:
//       return state;
//   }
// };

const tariffsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TARIFFS:
        debugger;
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
        draft.allTariffs[action.i].Tariff_Name = action.tariffName;
        draft.allTariffs[action.i].Tariff_MaxSpeed =
          action.tariffSpeed;
        draft.allTariffs[action.i].Tariff_Price = action.tariffPrice;
        break;
      case DELETE_TARIFF:
        draft.allTariffs.splice(action.tariffId - 1, 1);
        break;
      case CHANGE_TARIFF_STATUS:
        /*if (draft.tariffId === action.tariffId) draft.tariffId = null;
        else if (!draft.tariffId) draft.tariffId = action.tariffId;*/
        let index = draft.tariffs.findIndex(elem => elem.connected);
        if (index === -1) {
          draft.tariffs[action.tariffId - 1].connected = true;
          draft.tariffId = action.tariffId;
        } else if (index === action.tariffId - 1) {
          draft.tariffs[action.tariffId - 1].connected = false;
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

const changeTariffInfoAC = (
  i,
  tariffName,
  tariffSpeed,
  tariffPrice
) => ({
  type: CHANGE_TARIFF_INFO,
  i,
  tariffName,
  tariffSpeed,
  tariffPrice
});

const deleteTariffAC = tariffId => ({
  type: DELETE_TARIFF,
  tariffId
});

export const changeTariffStatus = tariffId => async dispatch => {
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
    i,
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
    dispatch(
      changeTariffInfoAC(i, tariffName, tariffSpeed, tariffPrice)
    );
  }
};

export const deleteTariff = tariffId => async dispatch => {
  debugger
  let response = await deleteTariffAPI(tariffId);
  if (response.resultCode === 0) dispatch(deleteTariffAC(tariffId));
};

export default tariffsReducer;
