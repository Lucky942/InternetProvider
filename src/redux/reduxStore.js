import { combineReducers, createStore } from "redux";
import tariffsReducer from "./tariffsReducer";
import servicesReducer from "./servicesReducer";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";

let reducers = combineReducers({
  tariffsReducer,
  servicesReducer,
  auth: authReducer,
  form: formReducer
});

let store = createStore(reducers);

export default store;
