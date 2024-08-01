import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

const createCourse = async (payload) => {
  const response = await api.post(API_ENDPOINTS.ADMIN.COURSE.CREATE, payload);
  return response;
};

const viewAllCourses = async (payload) => {
  const response = await api.post(API_ENDPOINTS.ADMIN.COURSE.VIEW_ALL, payload);
  return response;
};

const courseDetails = async (id) => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN.COURSE.VIEW_DETAILS}/${id}`
  );
  return response;
};

const updateCourse = async (payload) => {
  const response = await api.put(API_ENDPOINTS.ADMIN.COURSE.UPDATE, payload);
  return response;
};

const startNewBatch = async (payload) => {
  const response = await api.post(
    API_ENDPOINTS.ADMIN.COURSE.START_NEW_BATCH,
    payload
  );
  return response;
};

const stopEnrollment = async (id) => {
  const response = await api.post(`${API_ENDPOINTS.ADMIN.COURSE.STOP_ENROLLMENT}/${id}`);
  return response;
};

const coursesService = {
  createCourse,
  updateCourse,
  startNewBatch,
  courseDetails,
  viewAllCourses,
  stopEnrollment,
};

export default coursesService;
