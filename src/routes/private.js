// Importing Suspense and lazy function from React, and Route, Routes, and Navigate from React Router
import { Suspense, lazy } from 'react';
import { Icons } from 'assets';
import { Route, Routes } from 'react-router-dom';

// Importing lazy-loaded components for different authentication pages
const AccountVerification = lazy(() =>
  import('pages/auth/accountVerification')
);

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

// Array of private routes
export const privateRoutes = [
  {
    path: '/account-verification/*',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          {/* Route for account-verfication page */}
          <Route path="/" element={<AccountVerification />} />

          {/* Fallback route for unknown paths */}
          <Route path="*" element={<h2>Page not found!</h2>} />
        </Routes>
      </Suspense>
    )
  },

  // Fallback route for unknown paths
  {
    path: '*',
    element: <h2>Page not found!</h2>
  }
];
