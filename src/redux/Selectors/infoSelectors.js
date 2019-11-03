import {createSelector} from "reselect";

const getOrdersOfEqSelector = (state) => {
    return state.infoReducer.equipment.equipmentStat;
};

const getYearOfOrdersSelector = (state) => {
    return state.infoReducer.equipment.year;
};

const getYearOfMountersWorkSelector = (state) => {
    return state.infoReducer.mounters.mountersWorkReport.year;
};

const getMountersWorkReportSelector = (state) => {
    return state.infoReducer.mounters.mountersWorkReport.mountersWorkReport;
};

export const getOrdersOfEq = createSelector(getOrdersOfEqSelector, (equipmentStat) => equipmentStat);
export const getYearOfOrders = createSelector(getYearOfOrdersSelector, (year) => year);

export const getYearOfMountersWork = createSelector(getYearOfMountersWorkSelector, (year) => year);
export const getMountersWorkReport = createSelector(getMountersWorkReportSelector, (mountersWorkReport) => mountersWorkReport);
