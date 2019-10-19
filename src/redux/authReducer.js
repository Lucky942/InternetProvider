import produce from "immer";
import { loginAPI, logoutAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  login: null,
  tariffId: null,
  isAuth: false
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER_DATA:
        draft.userId = action.payload.userId;
        draft.login = action.payload.login;
        draft.tariffId = action.tariffId;
        draft.isAuth = action.payload.isAuth;
        break;
    }
  });

export const setUserData = (userId, login, tariffId, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, login, tariffId, isAuth }
});

export const login = (login, password, rememberMe) => dispatch => {
  loginAPI(login, password, rememberMe).then(response => {
    localStorage.setItem("token", response.data.token);
    if (response.data.resultCode === 0) {
      debugger;
      let { clientId, login, tariffId } = response.data;
      dispatch(setUserData(clientId, login, tariffId,  true));
    }
  });
};
export const logout = () => dispatch => {
  logoutAPI().then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setUserData(null, null, true));
    }
  });
};

export default authReducer;
