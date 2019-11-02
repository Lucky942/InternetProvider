import produce from "immer";
import { getAdminServicesAPI, getServicesAPI } from "../api/api";

const SET_SERVICES = "SET_SERVICES";

let initialState = {
  services: []
};

const servicesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SERVICES:
        draft.services = action.services;
        break;
    }
  });

const setServices = services => ({ type: SET_SERVICES, services });

/*export const getAdminServices = () => async (dispatch) => {
  let response = await getAdminServicesAPI();
  debugger

};*/

export const getServices = () => async dispatch => {
  let response = await getServicesAPI();
  debugger
  if (response.resultCode === 0) {
    let { services } = response;
    debugger
    dispatch(setServices(services));
  }
};

export default servicesReducer;
