import api from "./api";

export const disputeApi = {
  // Create a new dispute
  createDispute: async (escrowId, reason, description, evidenceUrl) => {
    try {
      const response = await api.post("/api/disputes/create", {
        escrowId,
        reason,
        description,
        evidenceUrl,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating dispute:", error);
      throw error;
    }
  },

  // Get disputes for a specific escrow
  getDisputesForEscrow: async (escrowId) => {
    try {
      const response = await api.get(`/api/disputes/escrow/${escrowId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching disputes for escrow:", error);
      throw error;
    }
  },

  // Get all disputes (admin)
  getAllDisputes: async () => {
    try {
      const response = await api.get("/api/admin/disputes");
      return response.data;
    } catch (error) {
      console.error("Error fetching all disputes:", error);
      throw error;
    }
  },

  // Resolve a dispute (admin)
  resolveDispute: async (disputeId, resolution, resolutionNotes) => {
    try {
      const response = await api.put(
        `/api/admin/disputes/${disputeId}/resolve`,
        {
          resolution,
          resolutionNotes,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error resolving dispute:", error);
      throw error;
    }
  },

  // Mark dispute as under review
  markAsUnderReview: async (disputeId) => {
    try {
      const response = await api.put(`/api/disputes/${disputeId}/under-review`);
      return response.data;
    } catch (error) {
      console.error("Error marking dispute as under review:", error);
      throw error;
    }
  },

  // Get disputes by status
  getDisputesByStatus: async (status) => {
    try {
      const response = await api.get(`/api/disputes/status/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching disputes by status:", error);
      throw error;
    }
  },
};
