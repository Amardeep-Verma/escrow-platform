import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

// ✅ connect using USER EMAIL
export const connectWebSocket = (userEmail, onMessageReceived) => {
  const socket = new SockJS("https://escrow-backend-1wt0.onrender.com/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ Connected to WebSocket");

      // 🔥 Subscribe ONLY to this user's channel
      const topic = `/topic/user/${userEmail}`;

      console.log("📡 Subscribed to:", topic);

      stompClient.subscribe(topic, (message) => {
        const data = JSON.parse(message.body);

        console.log("🔥 USER LIVE UPDATE:", data);

        onMessageReceived(data);
      });
    },

    onStompError: (frame) => {
      console.error("❌ WebSocket error:", frame);
    },
  });

  stompClient.activate();
};

// ✅ disconnect when leaving page
export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("🔌 WebSocket disconnected");
  }
};

// ✅ NEW: Enhanced WebSocket utilities
export const subscribeToEscrowUpdates = (escrowId, onEscrowUpdate) => {
  if (!stompClient) return;

  const topic = `/topic/escrow/${escrowId}`;

  stompClient.subscribe(topic, (message) => {
    const data = JSON.parse(message.body);
    onEscrowUpdate(data);
  });
};

export const subscribeToDisputeUpdates = (disputeId, onDisputeUpdate) => {
  if (!stompClient) return;

  const topic = `/topic/dispute/${disputeId}`;

  stompClient.subscribe(topic, (message) => {
    const data = JSON.parse(message.body);
    onDisputeUpdate(data);
  });
};

export const subscribeToAdminUpdates = (onAdminUpdate) => {
  if (!stompClient) return;

  const topic = `/topic/admin/updates`;

  stompClient.subscribe(topic, (message) => {
    const data = JSON.parse(message.body);
    onAdminUpdate(data);
  });
};

export const subscribeToChatUpdates = (escrowId, onChatUpdate) => {
  if (!stompClient) return;

  const topic = `/topic/chat/${escrowId}`;

  stompClient.subscribe(topic, (message) => {
    const data = JSON.parse(message.body);
    onChatUpdate(data);
  });
};

export const subscribeToWalletUpdates = (walletAddress, onWalletUpdate) => {
  if (!stompClient) return;

  const topic = `/topic/wallet/${walletAddress}`;

  stompClient.subscribe(topic, (message) => {
    const data = JSON.parse(message.body);
    onWalletUpdate(data);
  });
};

export const sendWebSocketMessage = (destination, message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(message),
    });
  }
};

export const isWebSocketConnected = () => {
  return stompClient && stompClient.connected;
};

export const getWebSocketStatus = () => {
  if (!stompClient) return "disconnected";
  if (stompClient.connected) return "connected";
  if (stompClient.active) return "connecting";
  return "disconnected";
};
