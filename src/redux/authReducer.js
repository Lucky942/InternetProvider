import produce from "immer";

const SET_USER_DATA = "SET_USER_DATA";


let initialState = {
  userId: null,
  login: null
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
        case SET_USER_DATA:
            draft = {...action.data};
            break;
    }
  });

export const setUserData = (userId, login) => ({ type: SET_USER_DATA, data: {userId, login} });

export default authReducer;
