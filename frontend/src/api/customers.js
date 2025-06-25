import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/customers",
});

export const fetchAllCustomers = () => API.get("/").then(res => res.data);
export const fetchCustomerById = id => API.get(`/${id}`).then(res => res.data);
export const createCustomer = payload => API.post("/", payload).then(res => res.data);
export const updateCustomer = (id, payload) => API.put(`/${id}`, payload).then(res => res.data);
export const deleteCustomer = id => API.delete(`/${id}`).then(res => res.data);
