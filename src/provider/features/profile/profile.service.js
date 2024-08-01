// Importing API_ENDPOINTS, ApiClient, and creating an instance of ApiClient
import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

// Service method to view the user profile
const viewProfile = async () => {
  const response = await api.get(API_ENDPOINTS.ADMIN.PROFILE.VIEW);
  return response;
};

// Service method to update the user profile
const updateProfile = async (data) => {
  const response = await api.put(API_ENDPOINTS.ADMIN.PROFILE.UPDATE, data);
  return response;
};

// Service method to update the user profile image
const updateProfileImage = async (formData) => {
  const response = await api.postWithFile(
    API_ENDPOINTS.ADMIN.FILE.SINGLE_UPLOAD,
    formData
  );
  return response;
};

// Service method to check the current password
const checkCurrentPassword = async (data) => {
  const response = await api.post(API_ENDPOINTS.AUTH.CHECK_PASSWORD, data);
  return response;
};

// Service method to change the user's password
const changePassword = async (data) => {
  const response = await api.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  return response;
};

// Exporting the profile-related service methods as authService
const profileService = {
  viewProfile,
  updateProfile,
  changePassword,
  updateProfileImage,
  checkCurrentPassword
};

export default profileService;
