import produce from "immer";
import { loginAPI, logoutAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA",
  CHANGE_TARIFF_STATUS = "CHANGE_TARIFF_STATUS";

let initialState = {
  userId: null,
  login: null,
  isAuth: false //!!localStorage.getItem('token')
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER_DATA:
        draft.userId = action.payload.userId;
        draft.login = action.payload.login;
        draft.isAuth = action.payload.isAuth;
        break;
    }
  });

export const setUserData = (userId, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, login, isAuth }
});



export const login = (login, password, rememberMe) => dispatch => {
  loginAPI(login, password, rememberMe).then(response => {
    if (response.data.resultCode === 0) {
      localStorage.setItem("token", response.data.token);
      let { clientId, login } = response.data;
      dispatch(setUserData(clientId, login, true));
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
