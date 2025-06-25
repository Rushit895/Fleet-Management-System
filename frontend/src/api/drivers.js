import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/drivers",
});

export const fetchAllDrivers = () => API.get("/").then(res => res.data);
export const fetchDriverById = id => API.get(`/${id}`).then(res => res.data);
export const createDriver = payload => API.post("/", payload).then(res => res.data);
export const updateDriver = (id, payload) => API.put(`/${id}`, payload).then(res => res.data);
export const deleteDriver = id => API.delete(`/${id}`).then(res => res.data);
