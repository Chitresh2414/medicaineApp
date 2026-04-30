import api from "./apiClient";

// 🔁 Common Handler
const handleRequest = async (request) => {
  try {
    const res = await request;
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * 📌 MEDICINES API
 */

// ✅ Get today's medicines
export const getTodayMedicinesApi = () =>
  handleRequest(api.get("/medicines/today"));

// ✅ Add new medicine
export const addMedicineApi = (data) =>
  handleRequest(api.post("/medicines", data));

// ✅ Toggle medicine taken/not taken
export const toggleMedicineTakeApi = (id) =>
  handleRequest(api.patch(`/medicines/${id}/take`));

// ✅ Get history
export const getHistoryApi = () =>
  handleRequest(api.get("/medicines/history"));

// ✅ Get all medicines
export const getAllMedicinesApi = () =>
  handleRequest(api.get("/medicines"));

// ✅ Get single medicine
export const getSingleMedicineApi = (id) =>
  handleRequest(api.get(`/medicines/${id}`));

// ✅ Update medicine
export const updateMedicineApi = (id, data) =>
  handleRequest(api.put(`/medicines/${id}`, data));

// ✅ Delete medicine
export const deleteMedicineApi = (id) =>
  handleRequest(api.delete(`/medicines/${id}`));