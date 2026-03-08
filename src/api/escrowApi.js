import api from "./api";

// ================= CREATE ESCROW
export const createEscrow = (data) => {
  return api.post("/api/escrows", data);
};

// ================= GET ESCROWS
export const getMyEscrows = (role) => {
  if (role === "buyer") {
    return api.get("/api/escrows/buyer");
  }
  return api.get("/api/escrows/seller");
};

// ================= FUND ESCROW (NEW)
export const fundEscrow = (id) => {
  return api.put(`/api/escrows/${id}/fund`);
};

// ================= SELLER SHIPS
export const shipEscrow = (id) => {
  return api.put(`/api/escrows/${id}/ship`);
};

// ================= BUYER CONFIRMS DELIVERY
export const confirmDelivery = (id) => {
  return api.put(`/api/escrows/${id}/confirm`);
};

// ================= BUYER RELEASES PAYMENT
export const releaseEscrow = (id) => {
  return api.put(`/api/escrows/${id}/release`);
};

// ✅ NEW: Enhanced escrow API methods
export const getEscrowDetails = (id) => {
  return api.get(`/api/escrows/${id}`);
};

export const getEscrowHistory = (id) => {
  return api.get(`/api/escrows/${id}/history`);
};

export const cancelEscrow = (id) => {
  return api.put(`/api/escrows/${id}/cancel`);
};

export const getEscrowAnalytics = () => {
  return api.get("/api/escrows/analytics");
};

export const getEscrowByContract = (contractAddress) => {
  return api.get(`/api/escrows/contract/${contractAddress}`);
};

export const updateEscrowMetadata = (id, metadata) => {
  return api.put(`/api/escrows/${id}/metadata`, metadata);
};

export const getEscrowDisputes = (id) => {
  return api.get(`/api/escrows/${id}/disputes`);
};

export const getEscrowChat = (id) => {
  return api.get(`/api/escrows/${id}/chat`);
};

export const sendMessage = (id, message) => {
  return api.post(`/api/escrows/${id}/chat`, { message });
};

export const getWalletBalance = () => {
  return api.get("/api/wallet/balance");
};

export const getWalletHistory = () => {
  return api.get("/api/wallet/history");
};

export const freezeEscrow = (id, reason) => {
  return api.put(`/api/escrows/${id}/freeze`, { reason });
};

export const unfreezeEscrow = (id) => {
  return api.put(`/api/escrows/${id}/unfreeze`);
};

export const banUser = (userId, reason) => {
  return api.post(`/api/admin/users/${userId}/ban`, { reason });
};

export const unbanUser = (userId) => {
  return api.post(`/api/admin/users/${userId}/unban`);
};

export const getAdminStats = () => {
  return api.get("/api/admin/stats");
};

export const exportEscrowData = (format = "json") => {
  return api.get(`/api/admin/export/escrows?format=${format}`, {
    responseType: "blob",
  });
};

export const searchEscrows = (query) => {
  return api.get(`/api/admin/escrows/search?q=${encodeURIComponent(query)}`);
};

export const bulkUpdateEscrows = (ids, action) => {
  return api.post("/api/admin/escrows/bulk", { ids, action });
};
