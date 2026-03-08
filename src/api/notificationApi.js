import API from "./api";

export const getNotifications = (userId) =>
  API.get(`/api/notifications/${userId}`);

export const getUnreadCount = (userId) =>
  API.get(`/api/notifications/unread/${userId}`);

export const markAllRead = (userId) =>
  API.post(`/api/notifications/read/${userId}`);
