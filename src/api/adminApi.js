import api from "./api";

export const getAllEscrows = () => api.get("/api/admin/escrows");

// ✅ NEW: Enhanced admin API methods
export const getAllUsers = () => api.get("/api/admin/users");

export const getUserById = (userId) => api.get(`/api/admin/users/${userId}`);

export const banUser = (userId, reason) =>
  api.post(`/api/admin/users/${userId}/ban`, { reason });

export const unbanUser = (userId) =>
  api.post(`/api/admin/users/${userId}/unban`);

export const freezeEscrow = (escrowId, reason) =>
  api.put(`/api/admin/escrows/${escrowId}/freeze`, { reason });

export const unfreezeEscrow = (escrowId) =>
  api.put(`/api/admin/escrows/${escrowId}/unfreeze`);

export const resolveDispute = (disputeId, decision) =>
  api.post(`/api/admin/disputes/${disputeId}/resolve`, { decision });

export const getDisputeDetails = (disputeId) =>
  api.get(`/api/admin/disputes/${disputeId}`);

export const getAllDisputes = () => api.get("/api/admin/disputes");

export const getAdminStats = () => api.get("/api/admin/stats");

export const getReports = () => api.get("/api/admin/reports");

export const exportData = (format = "json") =>
  api.get(`/api/admin/export?format=${format}`, {
    responseType: "blob",
  });

export const searchUsers = (query) =>
  api.get(`/api/admin/users/search?q=${encodeURIComponent(query)}`);

export const searchEscrows = (query) =>
  api.get(`/api/admin/escrows/search?q=${encodeURIComponent(query)}`);

export const bulkUpdateUsers = (userIds, action) =>
  api.post("/api/admin/users/bulk", { userIds, action });

export const bulkUpdateEscrows = (escrowIds, action) =>
  api.post("/api/admin/escrows/bulk", { escrowIds, action });

export const getAuditLogs = () => api.get("/api/admin/audit-logs");

export const getSystemHealth = () => api.get("/api/admin/health");

export const clearCache = () => api.post("/api/admin/cache/clear");

export const getNotifications = () => api.get("/api/admin/notifications");

export const markNotificationRead = (notificationId) =>
  api.post(`/api/admin/notifications/${notificationId}/read`);

export const broadcastNotification = (message) =>
  api.post("/api/admin/notifications/broadcast", { message });

export const getRolePermissions = (roleId) =>
  api.get(`/api/admin/roles/${roleId}/permissions`);

export const updateRolePermissions = (roleId, permissions) =>
  api.put(`/api/admin/roles/${roleId}/permissions`, { permissions });

export const createRole = (roleData) => api.post("/api/admin/roles", roleData);

export const deleteRole = (roleId) => api.delete(`/api/admin/roles/${roleId}`);

export const getSystemSettings = () => api.get("/api/admin/settings");

export const updateSystemSettings = (settings) =>
  api.put("/api/admin/settings", settings);

export const getApiKeys = () => api.get("/api/admin/api-keys");

export const createApiKey = (keyData) =>
  api.post("/api/admin/api-keys", keyData);

export const revokeApiKey = (keyId) =>
  api.delete(`/api/admin/api-keys/${keyId}`);

export const getDashboardMetrics = () => api.get("/api/admin/metrics");

export const getTransactionHistory = (filters) =>
  api.get("/api/admin/transactions", { params: filters });

export const generateReport = (reportType, dateRange) =>
  api.post("/api/admin/reports/generate", { reportType, dateRange });

export const getFeatureFlags = () => api.get("/api/admin/feature-flags");

export const updateFeatureFlag = (flagId, enabled) =>
  api.put(`/api/admin/feature-flags/${flagId}`, { enabled });

export const getMaintenanceMode = () => api.get("/api/admin/maintenance");

export const setMaintenanceMode = (enabled) =>
  api.post("/api/admin/maintenance", { enabled });

export const getBackupStatus = () => api.get("/api/admin/backups/status");

export const createBackup = () => api.post("/api/admin/backups/create");

export const restoreBackup = (backupId) =>
  api.post(`/api/admin/backups/${backupId}/restore`);

export const deleteBackup = (backupId) =>
  api.delete(`/api/admin/backups/${backupId}`);

export const getLogs = (level, limit = 100) =>
  api.get("/api/admin/logs", { params: { level, limit } });

export const clearLogs = () => api.delete("/api/admin/logs");

export const getPerformanceMetrics = () => api.get("/api/admin/performance");

export const optimizeDatabase = () => api.post("/api/admin/database/optimize");

export const getSecurityAlerts = () => api.get("/api/admin/security/alerts");

export const dismissSecurityAlert = (alertId) =>
  api.post(`/api/admin/security/alerts/${alertId}/dismiss`);

export const runSecurityScan = () => api.post("/api/admin/security/scan");

export const getComplianceReports = () => api.get("/api/admin/compliance");

export const exportComplianceReport = (reportType) =>
  api.get(`/api/admin/compliance/${reportType}/export`, {
    responseType: "blob",
  });

export const getIntegrationStatus = () => api.get("/api/admin/integrations");

export const updateIntegration = (integrationId, config) =>
  api.put(`/api/admin/integrations/${integrationId}`, { config });

export const testIntegration = (integrationId) =>
  api.post(`/api/admin/integrations/${integrationId}/test`);

export const getWebhooks = () => api.get("/api/admin/webhooks");

export const createWebhook = (webhookData) =>
  api.post("/api/admin/webhooks", webhookData);

export const updateWebhook = (webhookId, webhookData) =>
  api.put(`/api/admin/webhooks/${webhookId}`, webhookData);

export const deleteWebhook = (webhookId) =>
  api.delete(`/api/admin/webhooks/${webhookId}`);

export const testWebhook = (webhookId) =>
  api.post(`/api/admin/webhooks/${webhookId}/test`);

export const getRateLimits = () => api.get("/api/admin/rate-limits");

export const updateRateLimit = (limitId, config) =>
  api.put(`/api/admin/rate-limits/${limitId}`, config);

export const resetRateLimit = (limitId) =>
  api.post(`/api/admin/rate-limits/${limitId}/reset`);

export const getIpWhitelist = () => api.get("/api/admin/ip-whitelist");

export const addIpToWhitelist = (ipAddress) =>
  api.post("/api/admin/ip-whitelist", { ipAddress });

export const removeIpFromWhitelist = (ipAddress) =>
  api.delete("/api/admin/ip-whitelist", { data: { ipAddress } });

export const getTwoFactorAuthStatus = () => api.get("/api/admin/2fa/status");

export const enableTwoFactorAuth = () => api.post("/api/admin/2fa/enable");

export const disableTwoFactorAuth = () => api.post("/api/admin/2fa/disable");

export const getSessions = () => api.get("/api/admin/sessions");

export const revokeSession = (sessionId) =>
  api.delete(`/api/admin/sessions/${sessionId}`);

export const revokeAllSessions = () => api.delete("/api/admin/sessions/all");

export const getApiUsage = () => api.get("/api/admin/api-usage");

export const getErrorReports = () => api.get("/api/admin/errors");

export const resolveErrorReport = (errorId) =>
  api.post(`/api/admin/errors/${errorId}/resolve`);

export const getSystemUpdates = () => api.get("/api/admin/updates");

export const installUpdate = (updateId) =>
  api.post(`/api/admin/updates/${updateId}/install`);

export const rollbackUpdate = (updateId) =>
  api.post(`/api/admin/updates/${updateId}/rollback`);

export const getCustomFields = () => api.get("/api/admin/custom-fields");

export const createCustomField = (fieldData) =>
  api.post("/api/admin/custom-fields", fieldData);

export const updateCustomField = (fieldId, fieldData) =>
  api.put(`/api/admin/custom-fields/${fieldId}`, fieldData);

export const deleteCustomField = (fieldId) =>
  api.delete(`/api/admin/custom-fields/${fieldId}`);

export const getTranslations = () => api.get("/api/admin/translations");

export const updateTranslation = (locale, translations) =>
  api.put(`/api/admin/translations/${locale}`, { translations });

export const addTranslation = (locale, key, value) =>
  api.post("/api/admin/translations", { locale, key, value });

export const deleteTranslation = (locale, key) =>
  api.delete(`/api/admin/translations/${locale}/${key}`);

export const getThemes = () => api.get("/api/admin/themes");

export const createTheme = (themeData) =>
  api.post("/api/admin/themes", themeData);

export const updateTheme = (themeId, themeData) =>
  api.put(`/api/admin/themes/${themeId}`, themeData);

export const deleteTheme = (themeId) =>
  api.delete(`/api/admin/themes/${themeId}`);

export const activateTheme = (themeId) =>
  api.post(`/api/admin/themes/${themeId}/activate`);

export const getWidgets = () => api.get("/api/admin/widgets");

export const createWidget = (widgetData) =>
  api.post("/api/admin/widgets", widgetData);

export const updateWidget = (widgetId, widgetData) =>
  api.put(`/api/admin/widgets/${widgetId}`, widgetData);

export const deleteWidget = (widgetId) =>
  api.delete(`/api/admin/widgets/${widgetId}`);

export const reorderWidgets = (widgetOrder) =>
  api.post("/api/admin/widgets/reorder", { widgetOrder });

export const getDashboardLayout = () => api.get("/api/admin/dashboard-layout");

export const updateDashboardLayout = (layout) =>
  api.put("/api/admin/dashboard-layout", { layout });

export const resetDashboardLayout = () =>
  api.post("/api/admin/dashboard-layout/reset");

export const getHelpArticles = () => api.get("/api/admin/help");

export const createHelpArticle = (articleData) =>
  api.post("/api/admin/help", articleData);

export const updateHelpArticle = (articleId, articleData) =>
  api.put(`/api/admin/help/${articleId}`, articleData);

export const deleteHelpArticle = (articleId) =>
  api.delete(`/api/admin/help/${articleId}`);

export const getFaqs = () => api.get("/api/admin/faqs");

export const createFaq = (faqData) => api.post("/api/admin/faqs", faqData);

export const updateFaq = (faqId, faqData) =>
  api.put(`/api/admin/faqs/${faqId}`, faqData);

export const deleteFaq = (faqId) => api.delete(`/api/admin/faqs/${faqId}`);

export const reorderFaqs = (faqOrder) =>
  api.post("/api/admin/faqs/reorder", { faqOrder });

export const getAnnouncements = () => api.get("/api/admin/announcements");

export const createAnnouncement = (announcementData) =>
  api.post("/api/admin/announcements", announcementData);

export const updateAnnouncement = (announcementId, announcementData) =>
  api.put(`/api/admin/announcements/${announcementId}`, announcementData);

export const deleteAnnouncement = (announcementId) =>
  api.delete(`/api/admin/announcements/${announcementId}`);

export const publishAnnouncement = (announcementId) =>
  api.post(`/api/admin/announcements/${announcementId}/publish`);

export const unpublishAnnouncement = (announcementId) =>
  api.post(`/api/admin/announcements/${announcementId}/unpublish`);

export const getAnnouncementViews = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/views`);

export const getAnnouncementClicks = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/clicks`);

export const getAnnouncementMetrics = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/metrics`);

export const getAnnouncementRecipients = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/recipients`);

export const addAnnouncementRecipient = (announcementId, recipientData) =>
  api.post(
    `/api/admin/announcements/${announcementId}/recipients`,
    recipientData,
  );

export const removeAnnouncementRecipient = (announcementId, recipientId) =>
  api.delete(
    `/api/admin/announcements/${announcementId}/recipients/${recipientId}`,
  );

export const sendAnnouncementTest = (announcementId, testEmail) =>
  api.post(`/api/admin/announcements/${announcementId}/test`, { testEmail });

export const scheduleAnnouncement = (announcementId, scheduleData) =>
  api.post(`/api/admin/announcements/${announcementId}/schedule`, scheduleData);

export const cancelAnnouncementSchedule = (announcementId) =>
  api.delete(`/api/admin/announcements/${announcementId}/schedule`);

export const getAnnouncementSchedule = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/schedule`);

export const getAnnouncementTemplates = () =>
  api.get("/api/admin/announcement-templates");

export const createAnnouncementTemplate = (templateData) =>
  api.post("/api/admin/announcement-templates", templateData);

export const updateAnnouncementTemplate = (templateId, templateData) =>
  api.put(`/api/admin/announcement-templates/${templateId}`, templateData);

export const deleteAnnouncementTemplate = (templateId) =>
  api.delete(`/api/admin/announcement-templates/${templateId}`);

export const getAnnouncementCategories = () =>
  api.get("/api/admin/announcement-categories");

export const createAnnouncementCategory = (categoryData) =>
  api.post("/api/admin/announcement-categories", categoryData);

export const updateAnnouncementCategory = (categoryId, categoryData) =>
  api.put(`/api/admin/announcement-categories/${categoryId}`, categoryData);

export const deleteAnnouncementCategory = (categoryId) =>
  api.delete(`/api/admin/announcement-categories/${categoryId}`);

export const getAnnouncementTags = () =>
  api.get("/api/admin/announcement-tags");

export const createAnnouncementTag = (tagData) =>
  api.post("/api/admin/announcement-tags", tagData);

export const updateAnnouncementTag = (tagId, tagData) =>
  api.put(`/api/admin/announcement-tags/${tagId}`, tagData);

export const deleteAnnouncementTag = (tagId) =>
  api.delete(`/api/admin/announcement-tags/${tagId}`);

export const getAnnouncementAnalytics = () =>
  api.get("/api/admin/announcement-analytics");

export const getAnnouncementEngagement = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/engagement`);

export const getAnnouncementFeedback = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/feedback`);

export const getAnnouncementA11y = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/accessibility`);

export const getAnnouncementLocalization = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/localization`);

export const updateAnnouncementLocalization = (
  announcementId,
  localizationData,
) =>
  api.put(
    `/api/admin/announcements/${announcementId}/localization`,
    localizationData,
  );

export const getAnnouncementVersionHistory = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/versions`);

export const revertAnnouncementVersion = (announcementId, versionId) =>
  api.post(
    `/api/admin/announcements/${announcementId}/versions/${versionId}/revert`,
  );

export const compareAnnouncementVersions = (
  announcementId,
  versionId1,
  versionId2,
) =>
  api.get(`/api/admin/announcements/${announcementId}/versions/compare`, {
    params: { versionId1, versionId2 },
  });

export const getAnnouncementDrafts = () =>
  api.get("/api/admin/announcement-drafts");

export const createAnnouncementDraft = (draftData) =>
  api.post("/api/admin/announcement-drafts", draftData);

export const updateAnnouncementDraft = (draftId, draftData) =>
  api.put(`/api/admin/announcement-drafts/${draftId}`, draftData);

export const deleteAnnouncementDraft = (draftId) =>
  api.delete(`/api/admin/announcement-drafts/${draftId}`);

export const publishAnnouncementDraft = (draftId) =>
  api.post(`/api/admin/announcement-drafts/${draftId}/publish`);

export const getAnnouncementPreview = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/preview`);

export const getAnnouncementExport = (announcementId, format) =>
  api.get(`/api/admin/announcements/${announcementId}/export/${format}`, {
    responseType: "blob",
  });

export const importAnnouncements = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/api/admin/announcements/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAnnouncementBulkActions = () =>
  api.get("/api/admin/announcement-bulk-actions");

export const executeAnnouncementBulkAction = (action, announcementIds) =>
  api.post("/api/admin/announcement-bulk-actions", { action, announcementIds });

export const getAnnouncementPermissions = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/permissions`);

export const updateAnnouncementPermissions = (announcementId, permissions) =>
  api.put(`/api/admin/announcements/${announcementId}/permissions`, {
    permissions,
  });

export const getAnnouncementComments = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/comments`);

export const addAnnouncementComment = (announcementId, commentData) =>
  api.post(`/api/admin/announcements/${announcementId}/comments`, commentData);

export const updateAnnouncementComment = (
  announcementId,
  commentId,
  commentData,
) =>
  api.put(
    `/api/admin/announcements/${announcementId}/comments/${commentId}`,
    commentData,
  );

export const deleteAnnouncementComment = (announcementId, commentId) =>
  api.delete(
    `/api/admin/announcements/${announcementId}/comments/${commentId}`,
  );

export const getAnnouncementReactions = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/reactions`);

export const addAnnouncementReaction = (announcementId, reactionData) =>
  api.post(
    `/api/admin/announcements/${announcementId}/reactions`,
    reactionData,
  );

export const removeAnnouncementReaction = (announcementId, reactionId) =>
  api.delete(
    `/api/admin/announcements/${announcementId}/reactions/${reactionId}`,
  );

export const getAnnouncementShares = (announcementId) =>
  api.get(`/api/admin/announcements/${announcementId}/shares`);

export const shareAnnouncement = (announcementId, shareData) =>
  api.post(`/api/admin/announcements/${announcementId}/shares`, shareData);

export const getAnnouncementViewsByUser = (announcementId, userId) =>
  api.get(`/api/admin/announcements/${announcementId}/views/users/${userId}`);

export const getAnnouncementClicksByUser = (announcementId, userId) =>
  api.get(`/api/admin/announcements/${announcementId}/clicks/users/${userId}`);

export const getAnnouncementEngagementByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/engagement/users/${userId}`,
  );

export const getAnnouncementFeedbackByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/feedback/users/${userId}`,
  );

export const getAnnouncementA11yByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/accessibility/users/${userId}`,
  );

export const getAnnouncementLocalizationByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/localization/users/${userId}`,
  );

export const getAnnouncementVersionHistoryByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/versions/users/${userId}`,
  );

export const getAnnouncementDraftsByUser = (userId) =>
  api.get(`/api/admin/announcement-drafts/users/${userId}`);

export const getAnnouncementPreviewByUser = (announcementId, userId) =>
  api.get(`/api/admin/announcements/${announcementId}/preview/users/${userId}`);

export const getAnnouncementExportByUser = (announcementId, userId, format) =>
  api.get(
    `/api/admin/announcements/${announcementId}/export/users/${userId}/${format}`,
    {
      responseType: "blob",
    },
  );

export const getAnnouncementBulkActionsByUser = (userId) =>
  api.get(`/api/admin/announcement-bulk-actions/users/${userId}`);

export const executeAnnouncementBulkActionByUser = (
  userId,
  action,
  announcementIds,
) =>
  api.post(`/api/admin/announcement-bulk-actions/users/${userId}`, {
    action,
    announcementIds,
  });

export const getAnnouncementPermissionsByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/permissions/users/${userId}`,
  );

export const updateAnnouncementPermissionsByUser = (
  announcementId,
  userId,
  permissions,
) =>
  api.put(
    `/api/admin/announcements/${announcementId}/permissions/users/${userId}`,
    { permissions },
  );

export const getAnnouncementCommentsByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/comments/users/${userId}`,
  );

export const addAnnouncementCommentByUser = (
  announcementId,
  userId,
  commentData,
) =>
  api.post(
    `/api/admin/announcements/${announcementId}/comments/users/${userId}`,
    commentData,
  );

export const updateAnnouncementCommentByUser = (
  announcementId,
  userId,
  commentId,
  commentData,
) =>
  api.put(
    `/api/admin/announcements/${announcementId}/comments/users/${userId}/${commentId}`,
    commentData,
  );

export const deleteAnnouncementCommentByUser = (
  announcementId,
  userId,
  commentId,
) =>
  api.delete(
    `/api/admin/announcements/${announcementId}/comments/users/${userId}/${commentId}`,
  );

export const getAnnouncementReactionsByUser = (announcementId, userId) =>
  api.get(
    `/api/admin/announcements/${announcementId}/reactions/users/${userId}`,
  );

export const addAnnouncementReactionByUser = (
  announcementId,
  userId,
  reactionData,
) =>
  api.post(
    `/api/admin/announcements/${announcementId}/reactions/users/${userId}`,
    reactionData,
  );

export const removeAnnouncementReactionByUser = (
  announcementId,
  userId,
  reactionId,
) =>
  api.delete(
    `/api/admin/announcements/${announcementId}/reactions/users/${userId}/${reactionId}`,
  );

export const getAnnouncementSharesByUser = (announcementId, userId) =>
  api.get(`/api/admin/announcements/${announcementId}/shares/users/${userId}`);

export const shareAnnouncementByUser = (announcementId, userId, shareData) =>
  api.post(
    `/api/admin/announcements/${announcementId}/shares/users/${userId}`,
    shareData,
  );

// ✅ NEW: AI-Based Fraud Detection API methods
export const getFraudDetectionConfig = () => api.get("/api/admin/fraud/config");

export const updateFraudDetectionConfig = (config) =>
  api.put("/api/admin/fraud/config", config);

export const getFraudAlerts = (filters) =>
  api.get("/api/admin/fraud/alerts", { params: filters });

export const getFraudAlertById = (alertId) =>
  api.get(`/api/admin/fraud/alerts/${alertId}`);

export const resolveFraudAlert = (alertId, resolution) =>
  api.post(`/api/admin/fraud/alerts/${alertId}/resolve`, { resolution });

export const dismissFraudAlert = (alertId, reason) =>
  api.post(`/api/admin/fraud/alerts/${alertId}/dismiss`, { reason });

export const getFraudMetrics = () => api.get("/api/admin/fraud/metrics");

export const getFraudTrends = (timeRange) =>
  api.get("/api/admin/fraud/trends", { params: { timeRange } });

export const getRiskScores = (filters) =>
  api.get("/api/admin/fraud/risk-scores", { params: filters });

export const getRiskScoreById = (userId) =>
  api.get(`/api/admin/fraud/risk-scores/${userId}`);

export const updateRiskScore = (userId, score) =>
  api.put(`/api/admin/fraud/risk-scores/${userId}`, { score });

export const getSuspiciousPatterns = (filters) =>
  api.get("/api/admin/fraud/patterns", { params: filters });

export const getSuspiciousPatternById = (patternId) =>
  api.get(`/api/admin/fraud/patterns/${patternId}`);

export const flagSuspiciousPattern = (patternId, action) =>
  api.post(`/api/admin/fraud/patterns/${patternId}/flag`, { action });

export const getFraudReports = (filters) =>
  api.get("/api/admin/fraud/reports", { params: filters });

export const generateFraudReport = (reportType, dateRange) =>
  api.post("/api/admin/fraud/reports/generate", { reportType, dateRange });

export const exportFraudReport = (reportId, format) =>
  api.get(`/api/admin/fraud/reports/${reportId}/export/${format}`, {
    responseType: "blob",
  });

export const getFraudUsers = (filters) =>
  api.get("/api/admin/fraud/users", { params: filters });

export const getFraudUserById = (userId) =>
  api.get(`/api/admin/fraud/users/${userId}`);

export const flagUserAsFraudulent = (userId, reason) =>
  api.post(`/api/admin/fraud/users/${userId}/flag`, { reason });

export const unflagUserAsFraudulent = (userId, reason) =>
  api.post(`/api/admin/fraud/users/${userId}/unflag`, { reason });

export const getFraudTransactions = (filters) =>
  api.get("/api/admin/fraud/transactions", { params: filters });

export const getFraudTransactionById = (transactionId) =>
  api.get(`/api/admin/fraud/transactions/${transactionId}`);

export const flagTransactionAsFraudulent = (transactionId, reason) =>
  api.post(`/api/admin/fraud/transactions/${transactionId}/flag`, { reason });

export const unflagTransactionAsFraudulent = (transactionId, reason) =>
  api.post(`/api/admin/fraud/transactions/${transactionId}/unflag`, { reason });

export const getFraudMachineLearningModels = () =>
  api.get("/api/admin/fraud/ml-models");

export const getFraudModelById = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}`);

export const trainFraudModel = (modelId, trainingData) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/train`, trainingData);

export const evaluateFraudModel = (modelId, testData) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/evaluate`, testData);

export const deployFraudModel = (modelId) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/deploy`);

export const rollbackFraudModel = (modelId) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/rollback`);

export const getFraudModelMetrics = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/metrics`);

export const getFraudModelPredictions = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict`, data);

export const getFraudModelFeatures = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/features`);

export const updateFraudModelFeatures = (modelId, features) =>
  api.put(`/api/admin/fraud/ml-models/${modelId}/features`, { features });

export const getFraudModelLogs = (modelId, limit = 100) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/logs`, {
    params: { limit },
  });

export const clearFraudModelLogs = (modelId) =>
  api.delete(`/api/admin/fraud/ml-models/${modelId}/logs`);

export const getFraudModelHealth = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/health`);

export const getFraudModelPerformance = (modelId, timeRange) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/performance`, {
    params: { timeRange },
  });

export const getFraudModelAccuracy = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/accuracy`);

export const getFraudModelPrecision = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/precision`);

export const getFraudModelRecall = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/recall`);

export const getFraudModelF1Score = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/f1-score`);

export const getFraudModelConfusionMatrix = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/confusion-matrix`);

export const getFraudModelROC = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/roc`);

export const getFraudModelAUC = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/auc`);

export const getFraudModelFeatureImportance = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/feature-importance`);

export const getFraudModelSHAP = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/shap`);

export const getFraudModelLIME = (modelId) =>
  api.get(`/api/admin/fraud/ml-models/${modelId}/lime`);

export const getFraudModelExplanations = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/explain`, data);

export const getFraudModelAnomalies = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/anomalies`, data);

export const getFraudModelOutliers = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/outliers`, data);

export const getFraudModelClusters = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/clusters`, data);

export const getFraudModelAssociations = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/associations`, data);

export const getFraudModelCorrelations = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/correlations`, data);

export const getFraudModelPatterns = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/patterns`, data);

export const getFraudModelTrends = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/trends`, data);

export const getFraudModelPredictionsBatch = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-batch`, data);

export const getFraudModelPredictionsStream = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-stream`, data);

export const getFraudModelPredictionsRealTime = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-realtime`, data);

export const getFraudModelPredictionsHistorical = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-historical`, data);

export const getFraudModelPredictionsFuture = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-future`, data);

export const getFraudModelPredictionsAnomaly = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-anomaly`, data);

export const getFraudModelPredictionsOutlier = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-outlier`, data);

export const getFraudModelPredictionsCluster = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-cluster`, data);

export const getFraudModelPredictionsAssociation = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-association`, data);

export const getFraudModelPredictionsCorrelation = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-correlation`, data);

export const getFraudModelPredictionsPattern = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-pattern`, data);

export const getFraudModelPredictionsTrend = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-trend`, data);

export const getFraudModelPredictionsRisk = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-risk`, data);

export const getFraudModelPredictionsScore = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-score`, data);

export const getFraudModelPredictionsProbability = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-probability`, data);

export const getFraudModelPredictionsConfidence = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-confidence`, data);

export const getFraudModelPredictionsUncertainty = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-uncertainty`, data);

export const getFraudModelPredictionsVariance = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-variance`, data);

export const getFraudModelPredictionsEntropy = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-entropy`, data);

export const getFraudModelPredictionsMutualInformation = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-mutual-information`,
    data,
  );

export const getFraudModelPredictionsKLDivergence = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-kl-divergence`, data);

export const getFraudModelPredictionsJSdivergence = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-js-divergence`, data);

export const getFraudModelPredictionsBhattacharyyaDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-bhattacharyya-distance`,
    data,
  );

export const getFraudModelPredictionsHellingerDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-hellinger-distance`,
    data,
  );

export const getFraudModelPredictionsWassersteinDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-wasserstein-distance`,
    data,
  );

export const getFraudModelPredictionsEarthMoverDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-earth-mover-distance`,
    data,
  );

export const getFraudModelPredictionsKolmogorovSmirnovDistance = (
  modelId,
  data,
) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-kolmogorov-smirnov-distance`,
    data,
  );

export const getFraudModelPredictionsAndersonDarlingDistance = (
  modelId,
  data,
) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-anderson-darling-distance`,
    data,
  );

export const getFraudModelPredictionsCramervonMisesDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-cramer-von-mises-distance`,
    data,
  );

export const getFraudModelPredictionsChiSquareDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-chi-square-distance`,
    data,
  );

export const getFraudModelPredictionsJensenShannonDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-jensen-shannon-distance`,
    data,
  );

export const getFraudModelPredictionsMahalanobisDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-mahalanobis-distance`,
    data,
  );

export const getFraudModelPredictionsEuclideanDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-euclidean-distance`,
    data,
  );

export const getFraudModelPredictionsManhattanDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-manhattan-distance`,
    data,
  );

export const getFraudModelPredictionsCosineDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-cosine-distance`,
    data,
  );

export const getFraudModelPredictionsHammingDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-hamming-distance`,
    data,
  );

export const getFraudModelPredictionsLevenshteinDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-levenshtein-distance`,
    data,
  );

export const getFraudModelPredictionsDamerauLevenshteinDistance = (
  modelId,
  data,
) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-damerau-levenshtein-distance`,
    data,
  );

export const getFraudModelPredictionsJaroDistance = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-jaro-distance`, data);

export const getFraudModelPredictionsJaroWinklerDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-jaro-winkler-distance`,
    data,
  );

export const getFraudModelPredictionsSorensenDiceDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-sorensen-dice-distance`,
    data,
  );

export const getFraudModelPredictionsJaccardDistance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-jaccard-distance`,
    data,
  );

export const getFraudModelPredictionsOverlapCoefficient = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-overlap-coefficient`,
    data,
  );

export const getFraudModelPredictionsTverskyIndex = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-tversky-index`, data);

export const getFraudModelPredictionsSimpsonCoefficient = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-simpson-coefficient`,
    data,
  );

export const getFraudModelPredictionsPearsonCorrelation = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-pearson-correlation`,
    data,
  );

export const getFraudModelPredictionsSpearmanCorrelation = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-spearman-correlation`,
    data,
  );

export const getFraudModelPredictionsKendallCorrelation = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-kendall-correlation`,
    data,
  );

export const getFraudModelPredictionsMutualInformationCorrelation = (
  modelId,
  data,
) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-mutual-information-correlation`,
    data,
  );

export const getFraudModelPredictionsPointBiserialCorrelation = (
  modelId,
  data,
) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-point-biserial-correlation`,
    data,
  );

export const getFraudModelPredictionsPhiCoefficient = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-phi-coefficient`,
    data,
  );

export const getFraudModelPredictionsCramersV = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-cramers-v`, data);

export const getFraudModelPredictionsContingencyCoefficient = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-contingency-coefficient`,
    data,
  );

export const getFraudModelPredictionsTheilsU = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-theils-u`, data);

export const getFraudModelPredictionsUncertaintyCoefficient = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-uncertainty-coefficient`,
    data,
  );

export const getFraudModelPredictionsInformationGain = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-information-gain`,
    data,
  );

export const getFraudModelPredictionsGainRatio = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-gain-ratio`, data);

export const getFraudModelPredictionsGiniIndex = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-gini-index`, data);

export const getFraudModelPredictionsGiniImpurity = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-gini-impurity`, data);

export const getFraudModelPredictionsEntropyGain = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-entropy-gain`, data);

export const getFraudModelPredictionsReductionInImpurity = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-reduction-in-impurity`,
    data,
  );

export const getFraudModelPredictionsVarianceReduction = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-variance-reduction`,
    data,
  );

export const getFraudModelPredictionsMeanDecreaseImpurity = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-mean-decrease-impurity`,
    data,
  );

export const getFraudModelPredictionsMeanDecreaseAccuracy = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-mean-decrease-accuracy`,
    data,
  );

export const getFraudModelPredictionsPermutationImportance = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-permutation-importance`,
    data,
  );

export const getFraudModelPredictionsSHAPValues = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-values`, data);

export const getFraudModelPredictionsSHAPSummary = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-summary`, data);

export const getFraudModelPredictionsSHAPDependence = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence`,
    data,
  );

export const getFraudModelPredictionsSHAPInteraction = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction`,
    data,
  );

export const getFraudModelPredictionsSHAPForce = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-force`, data);

export const getFraudModelPredictionsSHAPWaterfall = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-waterfall`,
    data,
  );

export const getFraudModelPredictionsSHAPBeeswarm = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-beeswarm`, data);

export const getFraudModelPredictionsSHAPBar = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-bar`, data);

export const getFraudModelPredictionsSHAPHeatmap = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-heatmap`, data);

export const getFraudModelPredictionsSHAPScatter = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-scatter`, data);

export const getFraudModelPredictionsSHAPViolin = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-violin`, data);

export const getFraudModelPredictionsSHAPBox = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-box`, data);

export const getFraudModelPredictionsSHAPDensity = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-density`, data);

export const getFraudModelPredictionsSHAPHistogram = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-histogram`,
    data,
  );

export const getFraudModelPredictionsSHAPPie = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-pie`, data);

export const getFraudModelPredictionsSHAPDonut = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-donut`, data);

export const getFraudModelPredictionsSHAPSunburst = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-sunburst`, data);

export const getFraudModelPredictionsSHAPTreemap = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-treemap`, data);

export const getFraudModelPredictionsSHAPSankey = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-sankey`, data);

export const getFraudModelPredictionsSHAPChord = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-chord`, data);

export const getFraudModelPredictionsSHAPNetwork = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-network`, data);

export const getFraudModelPredictionsSHAPGraph = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-graph`, data);

export const getFraudModelPredictionsSHAPTree = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-tree`, data);

export const getFraudModelPredictionsSHAPDecision = (modelId, data) =>
  api.post(`/api/admin/fraud/ml-models/${modelId}/predict-shap-decision`, data);

export const getFraudModelPredictionsSHAPForcePlot = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot2 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot2`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot2 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot2`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot2 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot2`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot2 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot2`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot3 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot3`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot3 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot3`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot3 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot3`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot3 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot3`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot4 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot4`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot4 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot4`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot4 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot4`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot4 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot4`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot5 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot5`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot5 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot5`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot5 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot5`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot5 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot5`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot6 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot6`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot6 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot6`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot6 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot6`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot6 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot6`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot7 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot7`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot7 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot7`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot7 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot7`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot7 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot7`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot8 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot8`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot8 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot8`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot8 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot8`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot8 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot8`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot9 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot9`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot9 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot9`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot9 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot9`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot9 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot9`,
    data,
  );

export const getFraudModelPredictionsSHAPForcePlot10 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-force-plot10`,
    data,
  );

export const getFraudModelPredictionsSHAPSummaryPlot10 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-summary-plot10`,
    data,
  );

export const getFraudModelPredictionsSHAPDependencePlot10 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-dependence-plot10`,
    data,
  );

export const getFraudModelPredictionsSHAPInteractionPlot10 = (modelId, data) =>
  api.post(
    `/api/admin/fraud/ml-models/${modelId}/predict-shap-interaction-plot10`,
    data,
  );
