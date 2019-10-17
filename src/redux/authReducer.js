import produce from "immer";
import {loginAPI, logoutAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER_DATA:
        draft = { ...action.payload, isAuth: true };

        break;
    }
  });

export const setUserData = (userId, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, login, isAuth }
});

export const login = (login, password, rememberMe) => (dispatch) => {
  loginAPI(login,password,rememberMe)
      .then(response => {
          debugger;
        if(response.data.resultCode === 0){
          let {id, login} = response.data.data;
          dispatch(setUserData(id, login, true));
        }
      })
};
export const logout = () => (dispatch) => {
  logoutAPI()
      .then(response => {
        if(response.data.resultCode === 0){
            dispatch(setUserData(null, null, true));
        }
      })
};

export default authReducer;
