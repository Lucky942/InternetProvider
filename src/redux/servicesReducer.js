import produce from "immer";

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

export default servicesReducer;
