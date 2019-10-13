import { combineReducers, createStore } from "redux";
import tariffsReducer from "./tariffsReducer";
import servicesReducer from "./servicesReducer";

let reducers = combineReducers({
  tariffsReducer,
  servicesReducer
});

let Store = createStore(reducers);

export default Store;
