import produce from "immer";
import {getAuthUserData} from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false
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
