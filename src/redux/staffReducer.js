import produce from "immer";
import {getStaffAPI} from "../api/api";

const SET_STAFF = "SET_STAFF";

let initialState = {
    staff: []
};

const staffReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_STAFF:
                draft.staff = action.staff;
                break;
        }
    });

const setStaff = staff => ({ type: SET_STAFF, staff });

export const getStaff = () => async (dispatch) => {
    let response = await getStaffAPI();
            debugger
            dispatch(setStaff(response.staff));
};

export default staffReducer;
