import {createSelector} from "reselect";

const getTariffsSelector = (state) => {
    return state.tariffsReducer.tariffs;
};

const getTariffIdSelector = (state) => {
    return state.tariffsReducer.tariffId;
};


export const getTariffs = createSelector(getTariffsSelector, (tariffs) => tariffs);
export const getTariffId = createSelector(getTariffIdSelector, (tariffId) => tariffId);