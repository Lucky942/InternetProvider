import produce from "immer";
import { authMe, loginAPI, logoutAPI } from "../api/api";
import {getAuthUserData} from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false //!!localStorage.getItem('token')
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INITIALIZED_SUCCESS:
        draft.initialized = true;
        break;
    }
  });

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS
});

export const initializeApp = () => async dispatch => {
  let promise = dispatch(getAuthUserData());


  promise.then(() => {
    dispatch(initializedSuccess());
  })
};



export default appReducer;
