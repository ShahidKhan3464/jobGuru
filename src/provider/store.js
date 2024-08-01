// Importing configureStore from '@reduxjs/toolkit' and individual reducers
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import coursesReducer from './features/courses/courses.slice';
import profileReducer from './features/profile/profile.slice';
import billingsReducer from './features/billings/billings.slice';
import fileReducers from './features/fileUpload/fileUpload.slice';
import dashboardReducer from './features/dashboard/dashboard.slice';
import instructorsReducer from './features/instructors/instructors.slice';
import notificationsReducer from './features/notifications/notifications.slice';

const store = configureStore({
  // Reducers combined into a single object
  reducer: {
    auth: authReducer,
    file: fileReducers,
    profile: profileReducer,
    courses: coursesReducer,
    billings: billingsReducer,
    dashboard: dashboardReducer,
    instructor: instructorsReducer,
    notifications: notificationsReducer
  }
});

// Exporting the RootState (initial state of the Redux store)
export const RootState = store.getState();

export default store;
