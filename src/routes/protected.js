// Importing lazy function from React for code splitting and Navigate from React Router
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Importing lazy-loaded components for different pages
const LayoutContent = lazy(() => import('layout'));
const Profile = lazy(() => import('pages/adminSide/profile'));
const Billing = lazy(() => import('pages/adminSide/billing'));
const Dashboard = lazy(() => import('pages/adminSide/dashboard'));
const Courses = lazy(() => import('pages/adminSide/courses/list'));
const UpdateCourse = lazy(() => import('pages/adminSide/courses/create'));
const CreateCourse = lazy(() => import('pages/adminSide/courses/create'));
const Instructors = lazy(() => import('pages/adminSide/instructors/list'));
const NewBatchCourse = lazy(() => import('pages/adminSide/courses/create'));
const CourseDetails = lazy(() => import('pages/adminSide/courses/details'));
const InstructorDetails = lazy(() =>
  import('pages/adminSide/instructors/details')
);

// Array of protected routes
export const protectedRoutes = [
  { path: '/login', element: <Navigate to="/dashboard" replace /> },
  {
    path: '/',
    element: <LayoutContent />,
    children: [
      {
        // Dashboard page
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        // Instructors list page
        path: 'instructors',
        element: <Instructors />
      },
      {
        // Instructor details page with dynamic route parameter (id)
        path: 'instructor/viewDetails/:id',
        element: <InstructorDetails />
      },
      {
        // User profile page
        path: 'viewProfile',
        element: <Profile />
      },
      {
        // Courses page
        path: 'courses',
        element: <Courses />
      },
      {
        // Create course page
        path: 'course/createCourse',
        element: <CreateCourse />
      },
      {
        // Course details page with dynamic route parameter (id)
        path: 'course/viewDetails/:id',
        element: <CourseDetails />
      },
      {
        // Course update page with dynamic route parameter (id)
        path: 'course/editCourse/:id',
        element: <UpdateCourse />
      },
      {
        // Course new batch page with dynamic route parameter (id)
        path: 'course/newBatch/:id',
        element: <NewBatchCourse />
      },
      {
        // Billing page
        path: 'billings',
        element: <Billing />
      }
    ]
  },

  // Fallback route for unknown paths
  {
    path: '*',
    element: <h2>Page not found!</h2>
  }
];
