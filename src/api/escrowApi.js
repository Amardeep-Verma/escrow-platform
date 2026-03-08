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
