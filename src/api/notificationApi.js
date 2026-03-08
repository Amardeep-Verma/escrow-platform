import API from "./api";

export const getNotifications = (userId) =>
  API.get(`/api/notifications/${userId}`);

export const getUnreadCount = (userId) =>
  API.get(`/api/notifications/unread/${userId}`);

export const markAllRead = (userId) =>
  API.post(`/api/notifications/read/${userId}`);

// New API endpoints for enhanced notification system
export const markAsRead = (notificationId) =>
  API.post(`/api/notifications/${notificationId}/read`);

export const deleteNotification = (notificationId) =>
  API.delete(`/api/notifications/${notificationId}`);

export const getNotificationsByType = (userId, type) =>
  API.get(`/api/notifications/${userId}/type/${type}`);

export const getNotificationsByEscrow = (userId, escrowId) =>
  API.get(`/api/notifications/${userId}/escrow/${escrowId}`);

export const subscribeToNotifications = (userId, topics) =>
  API.post(`/api/notifications/subscribe/${userId}`, { topics });

export const unsubscribeFromNotifications = (userId, topics) =>
  API.post(`/api/notifications/unsubscribe/${userId}`, { topics });

export const getNotificationSettings = (userId) =>
  API.get(`/api/notifications/settings/${userId}`);

export const updateNotificationSettings = (userId, settings) =>
  API.put(`/api/notifications/settings/${userId}`, settings);

export const sendTestNotification = (userId, message) =>
  API.post(`/api/notifications/test/${userId}`, { message });

export const getNotificationAnalytics = (userId) =>
  API.get(`/api/notifications/analytics/${userId}`);

export const clearAllNotifications = (userId) =>
  API.delete(`/api/notifications/clear/${userId}`);
