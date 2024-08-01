// Importing API_ENDPOINTS from constants and ApiClient from services
import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';

// Creating an instance of the ApiClient
const api = new ApiClient();

// Function to add a new instructor
const addInstructor = async (data) => {
  const response = await api.post(API_ENDPOINTS.ADMIN.INSTRUCTOR.CREATE, data);
  return response;
};

// Function to view all instructors with pagination and sorting options
const viewAllInstructor = async (payload) => {
  const response = await api.post(
    API_ENDPOINTS.ADMIN.INSTRUCTOR.VIEW_ALL,
    payload
  );
  return response;
};

// Function to retrieve details of a specific instructor by ID
const instructorDetails = async (id) => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN.INSTRUCTOR.VIEW_DETAILS}/${id}`
  );
  return response;
};

// Function to delete an instructor by ID
const deleteInstructor = async (id) => {
  const response = await api.delete(
    `${API_ENDPOINTS.ADMIN.INSTRUCTOR.DELETE}/${id}`
  );
  return response;
};

// Object containing the instructor service functions
const instructorsService = {
  addInstructor,
  deleteInstructor,
  viewAllInstructor,
  instructorDetails
};

export default instructorsService;
