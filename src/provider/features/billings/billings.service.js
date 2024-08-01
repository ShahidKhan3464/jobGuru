import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

const viewAllBillings = async (payload) => {
  const response = await api.post(
    API_ENDPOINTS.ADMIN.COURSE.VIEW_ALL_BILLINGS,
    payload
  );
  return response;
};

const billingsService = {
  viewAllBillings
};

export default billingsService;
