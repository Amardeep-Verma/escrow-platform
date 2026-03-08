import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

// ✅ connect using USER EMAIL
export const connectWebSocket = (userEmail, onMessageReceived) => {
  const socket = new SockJS("http://localhost:9090/ws");

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
