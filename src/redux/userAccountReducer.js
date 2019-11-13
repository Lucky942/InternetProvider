import produce from "immer";
import {getAccountInfoAPI} from "../api/api";

const SET_ACCOUNT_INFO = "SET_ACCOUNT_INFO";

const initialState = {
    tariff: {},
    contract: {}
};

const userAccountReducer = (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case SET_ACCOUNT_INFO:
            draft.tariff = action.tariff;
            draft.contract.conclusionDate = action.conclusionDate;
            break;

    }
});

const setAccountInfo = (tariff, conclusionDate) => ({type:SET_ACCOUNT_INFO, tariff, conclusionDate});

export const getAccountInfo = (login) => async dispatch => {

    let response = await getAccountInfoAPI(login);
    if(response.resultCode === 0) {
        let {tariff, conclusionDate} = response;
        dispatch(setAccountInfo(tariff, conclusionDate));
    }

};

export default userAccountReducer;