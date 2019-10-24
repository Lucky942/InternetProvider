import { createSelector } from "reselect";

const getServicesSelector = state => state.servicesReducer.services;

export const getServices = createSelector(getServicesSelector, services => services);
