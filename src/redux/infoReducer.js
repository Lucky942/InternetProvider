import produce from "immer";
import {
  getExpensiveOrderMounterInfo,
  getLongestTimeMounter,
  getMountersYearReport,
  getNoOrdersMonthMounterInfo,
  getNoOrdersMounterInfo,
  getOrdersOfEquipmentStat
} from "../api/api";

const SET_EQUIPMENT_STAT = "SET_EQUIPMENT_STAT",
  SET_MOUNTERS_WORK_REPORT = "SET_MOUNTERS_WORK_REPORT",
  SET_LONGEST_TIME_MOUNTER_INFO = "SET_LONGEST_TIME_MOUNTER_INFO",
  SET_EXPENSIVE_ORDER_MOUNTER_INFO = "SET_EXPENSIVE_ORDER_MOUNTER_INFO",
  SET_NO_ORDERS_MOUNTER_INFO = "SET_NO_ORDERS_MOUNTER_INFO",
  SET_NO_ORDERS_MONTH_MOUNTER_INFO = "SET_NO_ORDERS_MONTH_MOUNTER_INFO";

const initialState = {
  equipment: {},
  mounters: {
    mountersWorkReport: {},
    longestTimeMounterInfo: {},
    expensiveOrderMounterInfo: {},
    noOrdersMounterInfo: {},
    noOrdersMonthMounterInfo: {}
  }
};

const infoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_EQUIPMENT_STAT:
        draft.equipment.year = action.year;
        draft.equipment.equipmentStat = action.ordersOfEquipment;
        break;
      case SET_MOUNTERS_WORK_REPORT:
        draft.mounters.mountersWorkReport.year = action.year;
        draft.mounters.mountersWorkReport.mountersWorkReport =
          action.mountersWorkReport;
        break;
      case SET_LONGEST_TIME_MOUNTER_INFO:
        draft.mounters.longestTimeMounterInfo = action.longestTimeMounterInfo;
        break;
      case SET_EXPENSIVE_ORDER_MOUNTER_INFO:
        draft.mounters.expensiveOrderMounterInfo.year = action.year;
        draft.mounters.expensiveOrderMounterInfo.expensiveOrderMounterInfo =
          action.expensiveOrderMounterInfo;
        break;
      case SET_NO_ORDERS_MOUNTER_INFO:
        draft.mounters.noOrdersMounterInfo = action.noOrdersMounterInfo;
        break;
      case SET_NO_ORDERS_MONTH_MOUNTER_INFO:
        draft.mounters.noOrdersMonthMounterInfo.noOrdersMonthMounterInfo =
          action.noOrdersMonthMounterInfo;
        draft.mounters.noOrdersMonthMounterInfo.year = action.year;
        draft.mounters.noOrdersMonthMounterInfo.month = action.month;
        break;
    }
  });

const setEquipmentStat = (year, ordersOfEquipment) => ({
  type: SET_EQUIPMENT_STAT,
  year,
  ordersOfEquipment
});
const setMounterWorkReport = (year, mountersWorkReport) => ({
  type: SET_MOUNTERS_WORK_REPORT,
  year,
  mountersWorkReport
});

const setLongestTimeMounterInfo = longestTimeMounterInfo => ({
  type: SET_LONGEST_TIME_MOUNTER_INFO,
  longestTimeMounterInfo
});

const setExpensiveOrderMounterInfo = (year, expensiveOrderMounterInfo) => ({
  type: SET_EXPENSIVE_ORDER_MOUNTER_INFO,
  year,
  expensiveOrderMounterInfo
});

const setNoOrdersMounterInfo = noOrdersMounterInfo => ({
  type: SET_NO_ORDERS_MOUNTER_INFO,
  noOrdersMounterInfo
});

const setNoOrdersMonthMounterInfo = (
  year,
  month,
  noOrdersMonthMounterInfo
) => ({
  type: SET_NO_ORDERS_MONTH_MOUNTER_INFO,
  year,
  month,
  noOrdersMonthMounterInfo
});

export const requestOrdersOfEquipmentStat = year => async dispatch => {
  let response = await getOrdersOfEquipmentStat(year);
  if (response.resultCode === 0) {
    let { equipmentStat } = response;
    dispatch(setEquipmentStat(year, equipmentStat));
  }
};

export const requestMountersYearReport = year => async dispatch => {
  let response = await getMountersYearReport(year);
  if (response.resultCode === 0) {
    let { mountersWorkReport } = response;
    dispatch(setMounterWorkReport(year, mountersWorkReport));
  }
};

export const requestLongestTimeMounter = () => async dispatch => {
  let response = await getLongestTimeMounter();
  if (response.resultCode === 0) {
    let { longestTimeMounterInfo } = response;
    dispatch(setLongestTimeMounterInfo(longestTimeMounterInfo));
  }
};

export const requestExpensiveOrderMounterInfo = year => async dispatch => {
  let response = await getExpensiveOrderMounterInfo(year);
  if (response.resultCode === 0) {
    let { expensiveOrderMounterInfo } = response;
    dispatch(setExpensiveOrderMounterInfo(year, expensiveOrderMounterInfo));
  }
};

export const requestNoOrdersMounterInfo = () => async dispatch => {
  let response = await getNoOrdersMounterInfo();
  if (response.resultCode === 0) {
    let { noOrdersMounterInfo } = response;
    dispatch(setNoOrdersMounterInfo(noOrdersMounterInfo));
  }
};

export const requestNoOrdersMonthMounterInfo = (
  year,
  month
) => async dispatch => {
  let response = await getNoOrdersMonthMounterInfo(year, month);
  if (response.resultCode === 0) {
    let { noOrdersMonthMounterInfo } = response;
    dispatch(
      setNoOrdersMonthMounterInfo(year, month, noOrdersMonthMounterInfo)
    );
  }
};

export default infoReducer;
