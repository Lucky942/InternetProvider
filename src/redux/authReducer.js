import produce from "immer";
import {
  authMe,
  createNewClientAPI,
  loginAPI,
  signUpAPI
} from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  login: null,
  userRole: null,
  isAuth: false //!!localStorage.getItem('token')
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER_DATA:
        draft.userId = action.payload.userId;
        draft.login = action.payload.login;
        draft.userRole = action.payload.userRole;
        draft.isAuth = action.payload.isAuth;
        break;
    }
  });

export const setUserData = (userId = null, login, userRole, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, login, userRole, isAuth }
});

export const createNewClient = (
  firstName,
  lastName,
  passport,
  birthday
) => async dispatch => {
  let response = await createNewClientAPI(
    firstName,
    lastName,
    passport,
    birthday
  );
  if (response.resultCode === 0) {
    localStorage.setItem("token", response.token);
    let { clientId, login, userRole } = response;
    dispatch(setUserData(clientId, login, userRole, true));
  }
};

export const getAuthUserData = () => async dispatch => {
  return authMe().then(response => {
    if (response.data.resultCode === 0) {
      let { clientId, login, userRole } = response.data;
      dispatch(setUserData(clientId, login, userRole, true));
    }
  });
};

export const signUp = (login, password, rememberMe) => async dispatch => {
  let response = await signUpAPI(login, password, rememberMe);
  if (response.data.resultCode === 0) {
    localStorage.setItem("token", response.data.token);
    let { /*clientId,*/ login, userRole } = response.data;
    dispatch(setUserData(null, login, userRole, true));
  } else {
    dispatch(stopSubmit("signUp", { _error: response.data.message }));
  }
};

export const login = (login, password) => dispatch => {
  loginAPI(login, password).then(response => {
    if (response.data.resultCode === 0) {
      localStorage.setItem("token", response.data.token);
      let { clientId, login, userRole } = response.data;
      dispatch(setUserData(clientId, login, userRole, true));
    } else {
      dispatch(stopSubmit("login", { _error: response.data.message }));
    }
  });
};
export const logout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch(setUserData(null, null, null, false));
};

export default authReducer;
