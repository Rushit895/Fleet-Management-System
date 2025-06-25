import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/owners",
});

export const fetchAllOwners = () => API.get("/").then(res => res.data);
export const fetchOwnerById = id => API.get(`/${id}`).then(res => res.data);
export const createOwner = payload => API.post("/", payload).then(res => res.data);
export const updateOwner = (id, payload) => API.put(`/${id}`, payload).then(res => res.data);
export const deleteOwner = id => API.delete(`/${id}`).then(res => res.data);
