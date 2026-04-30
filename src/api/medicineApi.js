import api from './apiCleient';

const handleRequest = async (request) => {
  try {
    const res = await request;
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTodayMedicinesApi = () =>
  handleRequest(api.get("/medicines/today"));

export const addMedicineApi = (data) =>
  handleRequest(api.post("/medicines", data));

export const toggleMedicineTakeApi = (id) =>
  handleRequest(api.patch(`/medicines/${id}/take`));

export const getHistoryApi = () =>
  handleRequest(api.get("/medicines/history"));

export const getAllMedicinesApi = () =>
  handleRequest(api.get("/medicines"));

export const getSingleMedicineApi = (id) =>
  handleRequest(api.get(`/medicines/${id}`));

export const updateMedicineApi = (id, data) =>
  handleRequest(api.put(`/medicines/${id}`, data));

export const deleteMedicineApi = (id) =>
  handleRequest(api.delete(`/medicines/${id}`));