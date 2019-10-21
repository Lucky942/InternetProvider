import {applyMiddleware, combineReducers, createStore} from "redux";
import tariffsReducer from "./tariffsReducer";
import servicesReducer from "./servicesReducer";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";

let reducers = combineReducers({
  tariffsReducer,
  servicesReducer,
  app: appReducer,
  auth: authReducer,
  form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
