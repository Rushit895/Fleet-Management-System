import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/maintenances",
});

export const fetchAllMaintenances = () => API.get("/").then(res => res.data);
export const fetchMaintenanceById = id => API.get(`/${id}`).then(res => res.data);
export const createMaintenance = payload => API.post("/", payload).then(res => res.data);
export const updateMaintenance = (id, payload) => API.put(`/${id}`, payload).then(res => res.data);
export const deleteMaintenance = id => API.delete(`/${id}`).then(res => res.data);
