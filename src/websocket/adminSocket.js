import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectAdminSocket = (onMessage) => {
  const socket = new SockJS("https://escrow-backend-1wt0.onrender.com/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ Admin WebSocket Connected");

      stompClient.subscribe("/topic/admin/escrows", (message) => {
        const updatedEscrow = JSON.parse(message.body);
        onMessage(updatedEscrow);
      });
    },

    onStompError: (frame) => {
      console.error("WebSocket error:", frame);
    },
  });

  stompClient.activate();
};

export const disconnectAdminSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};

// ✅ NEW: Enhanced admin WebSocket utilities
export const subscribeToAdminDisputes = (onDisputeUpdate) => {
  if (!stompClient) return;

  stompClient.subscribe("/topic/admin/disputes", (message) => {
    const dispute = JSON.parse(message.body);
    onDisputeUpdate(dispute);
  });
};

export const subscribeToAdminUsers = (onUserUpdate) => {
  if (!stompClient) return;

  stompClient.subscribe("/topic/admin/users", (message) => {
    const user = JSON.parse(message.body);
    onUserUpdate(user);
  });
};

export const subscribeToAdminStats = (onStatsUpdate) => {
  if (!stompClient) return;

  stompClient.subscribe("/topic/admin/stats", (message) => {
    const stats = JSON.parse(message.body);
    onStatsUpdate(stats);
  });
};

export const subscribeToAdminReports = (onReportUpdate) => {
  if (!stompClient) return;

  stompClient.subscribe("/topic/admin/reports", (message) => {
    const report = JSON.parse(message.body);
    onReportUpdate(report);
  });
};

export const sendAdminAction = (action, data) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/admin/action",
      body: JSON.stringify({ action, data }),
    });
  }
};

export const broadcastAdminNotification = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/admin/notify",
      body: JSON.stringify(message),
    });
  }
};

export const getAdminSocketStatus = () => {
  if (!stompClient) return "disconnected";
  if (stompClient.connected) return "connected";
  if (stompClient.active) return "connecting";
  return "disconnected";
};
