import produce from "immer";
import {changeTariffStatusApi, getTariffsAPI, getTariffsStatAPI, loginAPI} from "../api/api";

const SET_TARIFFS = "SET_TARIFFS",
  CHANGE_TARIFF_STATUS = "CHANGE_TARIFF_STATUS";

let initialState = {
  tariffs: []
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
        draft.tariffs = action.tariffs;
        draft.tariffId = action.tariffId;
        break;

      case CHANGE_TARIFF_STATUS:
        if (draft.tariffId === action.tariffId) draft.tariffId = null;
        else if (!draft.tariffId) draft.tariffId = action.tariffId;
        //draft.tariffId = draft.tariffId ? null : action.tariffId;
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

const setTariffsStat = (tariffs) => ({
  type: SET_TARIFFS,
  tariffs
});


export const changeTariffStatus = tariffId => dispatch => {
  changeTariffStatusApi(tariffId).then(response => {
    if (response.resultCode === 0) dispatch(setTariffStatus(tariffId));
  });
};

export const requestTariffs = () => dispatch => {
  getTariffsAPI().then(response => {
    if (response.resultCode === 0) {
      let { tariffs, tariffId } = response;
      dispatch(setTariffs(tariffs, tariffId));
    }
};

export const getTariffsStat = () => async dispatch => {
  let response = await getTariffsStatAPI();
  if (response.resultCode === 0) {
    let {tariffs} = response;
    dispatch(setTariffsStat(tariffs));
  }
};

export default tariffsReducer;
