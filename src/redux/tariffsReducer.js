import produce from "immer";
import { changeTariffStatusApi, getTariffsAPI, loginAPI } from "../api/api";

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

export const setTariffStatus = tariffId => ({
  type: CHANGE_TARIFF_STATUS,
  tariffId
});

export const changeTariffStatus = tariffId => dispatch => {
  changeTariffStatusApi(tariffId).then(response => {
    if (response.resultCode === 0) dispatch(setTariffStatus(tariffId));
  });
};

export const setTariffs = (tariffs, tariffId) => ({
  type: SET_TARIFFS,
  tariffs,
  tariffId
});

export const requestTariffs = () => async dispatch => {
  let response = await getTariffsAPI();
    if (response.resultCode === 0) {
      let { tariffs, tariffId } = response;
      dispatch(setTariffs(tariffs, tariffId));
    }
};

export default tariffsReducer;
