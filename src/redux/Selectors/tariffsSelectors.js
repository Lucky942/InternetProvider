import { createSelector } from "reselect";

const getTariffsSelector = state => state.tariffsReducer.tariffs;
const getTariffIdSelector = state => state.tariffsReducer.tariffId;

export const getTariffs = createSelector(
  getTariffsSelector,
  tariffs => tariffs
);
export const getTariffId = createSelector(
  getTariffIdSelector,
  tariffId => tariffId
);
