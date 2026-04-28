import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const leadsApi = {
  getAll: (params = {}) => api.get("/leads", { params }),
  getStats: () => api.get("/leads/stats"),
  create: (data) => api.post("/leads", data),
  updateStatus: (id, status) => api.put(`/leads/${id}`, { status }),
  delete: (id) => api.delete(`/leads/${id}`),
};

export default api;
