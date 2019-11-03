import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import tariffsReducer from "./tariffsReducer";
import servicesReducer from "./servicesReducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";
import staffReducer from "./staffReducer";
import infoReducer from "./infoReducer";

let reducers = combineReducers({
  tariffsReducer,
  servicesReducer,
  infoReducer,
  app: appReducer,
  auth: authReducer,
  staff: staffReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
//let store = createStore(reducers, applyMiddleware(thunk));

export default store;
