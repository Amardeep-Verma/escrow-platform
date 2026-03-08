import api from "./api";

export const getAllEscrows = () => api.get("/api/admin/escrows");
