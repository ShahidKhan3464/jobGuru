import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

const singleFileUpload = async (formData) => {
  const response = await api.postWithFile(
    API_ENDPOINTS.ADMIN.FILE.SINGLE_UPLOAD,
    formData
  );
  return response;
};

const multipleFileUpload = async (formData) => {
  const response = await api.postWithFile(
    API_ENDPOINTS.ADMIN.FILE.MULTIPLE_UPLOAD,
    formData
  );
  return response;
};

const fileUploadService = {
  singleFileUpload,
  multipleFileUpload
};

export default fileUploadService;
