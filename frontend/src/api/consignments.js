import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/consignments",
});

export const fetchAllConsignments = () => API.get("/").then(res => res.data);
export const fetchConsignmentById = id => API.get(`/${id}`).then(res => res.data);
export const createConsignment = payload => API.post("/", payload).then(res => res.data);
export const updateConsignment = (id, payload) => API.put(`/${id}`, payload).then(res => res.data);
export const deleteConsignment = id => API.delete(`/${id}`).then(res => res.data);
