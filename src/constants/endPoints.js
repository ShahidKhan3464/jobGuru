export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    RESEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    ENABLE_TWO_FACTOR: '/auth/enable-2fa',
    CHECK_PASSWORD: '/auth/check-password',
    RESET_PASSWORD: '/auth/reset-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  ADMIN: {
    INSTRUCTOR: {
      CREATE: '/admin/create-instructor',
      DELETE: '/admin/delete-instructor',
      VIEW_ALL: '/admin/view-instructors',
      VIEW_DETAILS: '/admin/view-instructor',
    },
    PROFILE: {
      VIEW: '/admin/view-profile',
      UPDATE: '/admin/update-profile'
    },
    COURSE: {
      CREATE: '/course/create-course',
      UPDATE: '/course/update-course',
      VIEW_ALL: '/course/view-courses',
      VIEW_DETAILS: '/course/view-course',
      STOP_ENROLLMENT: '/course/stop-enrollment',
      VIEW_ALL_BILLINGS: '/course/view-billings',
      START_NEW_BATCH: '/course/create-course-batch',
      VIEW_RECENT_ENROLLED: 'course/view-recent-enrolled',
      VIEW_DASHBOARD_SUMMARY: 'course/view-dashboard-summary',
      VIEW_LECTURES_SCHEDULES: 'course/view-lectures-schedules',
      VIEW_MONTHLY_ENROLLED_STUDENTS: 'course/view-monthly-enrollment-data',
    },
    FILE: {
      SINGLE_UPLOAD: '/file/upload',
      MULTIPLE_UPLOAD: '/file/uploads'
    },
    NOTIFICATIONS: {
      VIEW_ALL: '/notification/view-all',
      CLEAR_ALL: '/notification/clear-all',
      MARK_ALL_AS_READ: '/notification/mark-all-read'
    }
  }
};
