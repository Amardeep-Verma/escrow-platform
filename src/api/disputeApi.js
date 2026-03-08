import api from "./api";

export const raiseDispute = (escrowId, reason, evidenceUrl) =>
  api.post("/api/disputes/raise", null, {
    params: { escrowId, reason, evidenceUrl },
  });

export const getAllDisputes = () => api.get("/api/disputes/all");

export const resolveDispute = (disputeId, decision) =>
  api.post("/api/disputes/resolve", null, {
    params: { disputeId, decision },
  });
