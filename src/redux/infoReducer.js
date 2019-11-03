import produce from "immer";
import { getMountersYearReport, getOrdersOfEquipmentStat } from "../api/api";

const SET_EQUIPMENT_STAT = "SET_EQUIPMENT_STAT",
  SET_MOUNTERS_WORK_REPORT = "SET_MOUNTERS_WORK_REPORT";

const initialState = {
  equipment: {},
  mounters: {
    mountersWorkReport: {}
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

export default infoReducer;
