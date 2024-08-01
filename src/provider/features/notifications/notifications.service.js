// Importing API_ENDPOINTS, ApiClient, and creating an instance of ApiClient
import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

// Function to view all notifications
const viewAllNotifications = async () => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN.NOTIFICATIONS.VIEW_ALL}`
  );
  return response;
};

// Function to mark all as read notifications
const markAllAsReadNotifications = async () => {
  const response = await api.put(
    API_ENDPOINTS.ADMIN.NOTIFICATIONS.MARK_ALL_AS_READ
  );
  return response;
};

// Function to clear all notifications
const clearAllNotifications = async () => {
  const response = await api.delete(
    API_ENDPOINTS.ADMIN.NOTIFICATIONS.CLEAR_ALL
  );
  return response;
};

// Object containing the notification service functions
const notificationsService = {
  viewAllNotifications,
  clearAllNotifications,
  markAllAsReadNotifications
};

export default notificationsService;
