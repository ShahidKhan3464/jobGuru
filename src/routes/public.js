// Importing Suspense and lazy function from React, and Route, Routes, and Navigate from React Router
import { Suspense, lazy } from 'react';
import { Icons } from 'assets';
import { Route, Routes, Navigate } from 'react-router-dom';

// Importing lazy-loaded components for different authentication pages
const Login = lazy(() => import('pages/auth/login'));
const ResetPassword = lazy(() => import('pages/auth/resetPassword'));
const ForgetPassword = lazy(() => import('pages/auth/forgetPassword'));

// Component for displaying a splash screen during suspense fallback
const SplashScreen = () => {
  const style = {
    top: '50%',
    left: '50%',
    position: 'fixed',
    transform: 'translate(-50%, -50%)'
  };

  return <img src={Icons.splashScreen} style={style} alt="splash-screen" />;
};

// Array of public routes
export const publicRoutes = [
  { path: '/', element: <Navigate to="/login" replace /> },
  {
    path: '/*',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for forget password page */}
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Route for reset password page */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Fallback route for unknown paths */}
          <Route path="*" element={<h2>Page not found!</h2>} />
        </Routes>
      </Suspense>
    )
  }
];
