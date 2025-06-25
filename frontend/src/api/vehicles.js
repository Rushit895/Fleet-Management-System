import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/vehicles",
});

export const fetchAllVehicles = () => API.get("/").then(res => res.data);
export const fetchVehicleById = id => API.get(`/${id}`).then(res => res.data);
export const createVehicle = payload => API.post("/", payload).then(res => res.data);
export const updateVehicle = (id, payload) => API.put(`/${id}`, payload).then(res => res.data);
export const deleteVehicle = id => API.delete(`/${id}`).then(res => res.data);
