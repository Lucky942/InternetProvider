import produce from "immer";

const SET_TARIFFS = "SET_TARIFFS";

let initialState = {
  tariffs: []
};

// const tariffsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_TARIFFS:
//       let stateCopy = { ...state };
//       stateCopy.tariffs = action.tariffs;
//       return stateCopy;
//     default:
//       return state;
//   }
// };
const tariffsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TARIFFS:
        draft.tariffs = action.tariffs;
        break;
    }
  });

export const setTariffs = tariffs => ({ type: SET_TARIFFS, tariffs });

export default tariffsReducer;
