import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectAdminSocket = (onMessage) => {
  const socket = new SockJS("http://localhost:9090/ws");

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
