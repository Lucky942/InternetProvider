import produce from "immer";
import { getServicesAPI } from "../api/api";

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

export const setServices = services => ({ type: SET_SERVICES, services });

export const requestServices = () => async dispatch => {
  let response = await getServicesAPI();
  dispatch(setServices(response.data));
};

export default servicesReducer;
