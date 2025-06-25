import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/availabilities",
});

export const fetchAllAvailabilities = () => API.get("/").then(res => res.data);
export const fetchAvailabilityById = id => API.get(`/${id}`).then(res => res.data);
export const createAvailability = payload => API.post("/", payload).then(res => res.data);
export const updateAvailability = (id, payload) => API.put(`/${id}`, payload).then(res => res.data);
export const deleteAvailability = id => API.delete(`/${id}`).then(res => res.data);
