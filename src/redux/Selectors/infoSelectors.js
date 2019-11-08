import { createSelector } from "reselect";

const getOrdersOfEqSelector = state => {
  return state.infoReducer.equipment.equipmentStat;
};
const getYearOfOrdersSelector = state => {
  return state.infoReducer.equipment.year;
};

const getYearOfMountersWorkSelector = state => {
  return state.infoReducer.mounters.mountersWorkReport.year;
};
const getMountersWorkReportSelector = state => {
  return state.infoReducer.mounters.mountersWorkReport.mountersWorkReport;
};

const getExpensiveOrderMounterInfoSelector = state => {
  return state.infoReducer.mounters.expensiveOrderMounterInfo
    .expensiveOrderMounterInfo;
};

const getYearOfExpensiveOrderSelector = state => {
  return state.infoReducer.mounters.expensiveOrderMounterInfo.year;
};

const getLongestTimeMounterInfoSelector = state => {
  return state.infoReducer.mounters.longestTimeMounterInfo;
};

const getNoOrdersMounterInfoSelector = state => {
  return state.infoReducer.mounters.noOrdersMounterInfo;
};

const getNoOrdersMonthMounterInfoSelector = state => {
  return state.infoReducer.mounters.noOrdersMonthMounterInfo
    .noOrdersMonthMounterInfo;
};

const getYearOfNoOrdersSelector = state => {
  return state.infoReducer.mounters.noOrdersMonthMounterInfo.year;
};

const getMonthOfNoOrdersSelector = state => {
  return state.infoReducer.mounters.noOrdersMonthMounterInfo.month;
};

export const getOrdersOfEq = createSelector(
  getOrdersOfEqSelector,
  equipmentStat => equipmentStat
);
export const getYearOfOrders = createSelector(
  getYearOfOrdersSelector,
  year => year
);

export const getYearOfMountersWork = createSelector(
  getYearOfMountersWorkSelector,
  year => year
);
export const getMountersWorkReport = createSelector(
  getMountersWorkReportSelector,
  mountersWorkReport => mountersWorkReport
);

export const getYearOfExpensiveOrder = createSelector(
  getYearOfExpensiveOrderSelector,
  year => year
);
export const getExpensiveOrderMounterInfo = createSelector(
  getExpensiveOrderMounterInfoSelector,
  expensiveOrderMounterInfo => expensiveOrderMounterInfo
);

export const getLongestTimeMounterInfo = createSelector(
  getLongestTimeMounterInfoSelector,
  longestTimeMounterInfo => longestTimeMounterInfo
);

export const getNoOrdersMounterInfo = createSelector(
  getNoOrdersMounterInfoSelector,
  noOrdersMounterInfo => noOrdersMounterInfo
);

export const getNoOrdersMonthMounterInfo = createSelector(
  getNoOrdersMonthMounterInfoSelector,
  noOrdersMonthMounterInfo => noOrdersMonthMounterInfo
);
export const getYearOfNoOrders = createSelector(
  getYearOfNoOrdersSelector,
  year => year
);
export const getMonthOfNoOrders = createSelector(
  getMonthOfNoOrdersSelector,
  month => month
);
