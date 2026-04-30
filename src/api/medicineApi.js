import api from "../api/apiCleient";

/**
 * MEDICINES API
 */

// TODAY MEDICINES
export const getTodayMedicinesApi = async () => {
  const res = await api.get("/medicines/today");
  return res.data;
};

// ADD MEDICINE
export const addMedicineApi = async (data) => {
  const res = await api.post("/medicines/", data);
  return res.data;
};

// TOGGLE TAKE
export const toggleMedicineTakeApi = async (id) => {
  const res = await api.patch(`/medicines/${id}/take`);
  return res.data;
};

// HISTORY
export const getHistoryApi = async () => {
  const res = await api.get("/medicines/history");
  return res.data;
};

// ALL MEDICINES
export const getAllMedicinesApi = async () => {
  const res = await api.get("/medicines/");
  return res.data;
};

// SINGLE MEDICINE
export const getSingleMedicineApi = async (id) => {
  const res = await api.get(`/medicines/${id}`);
  return res.data;
};

// DELETE MEDICINE
export const deleteMedicineApi = async (id) => {
  const res = await api.delete(`/medicines/${id}`);
  return res.data;
};