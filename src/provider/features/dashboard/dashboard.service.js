import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

const getDashboardSummary = async () => {
  const response = await api.get(
    API_ENDPOINTS.ADMIN.COURSE.VIEW_DASHBOARD_SUMMARY
  );
  return response;
};

const viewRecentEnrolledStudents = async () => {
  const response = await api.get(
    API_ENDPOINTS.ADMIN.COURSE.VIEW_RECENT_ENROLLED
  );
  return response;
};

const viewMonthlyEnrolledStudents = async (year) => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN.COURSE.VIEW_MONTHLY_ENROLLED_STUDENTS}/${year}`
  );
  return response;
};

const viewLecturesSchedules = async (date) => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN.COURSE.VIEW_LECTURES_SCHEDULES}/${date}`
  );
  return response;
};

const dashboardService = {
  getDashboardSummary,
  viewLecturesSchedules,
  viewRecentEnrolledStudents,
  viewMonthlyEnrolledStudents
};

export default dashboardService;
