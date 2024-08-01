// Importing React and utility function to get access token
import React from 'react';
import { getAccessToken, getUser } from 'utils';

// Importing public, private and protected routes
import { publicRoutes } from 'routes/public';
import { privateRoutes } from 'routes/private';
import { protectedRoutes } from 'routes/protected';

// Importing React Router components for routing
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const App = () => {
  const isAuthenticated = getAccessToken();
  const isTwoFactorEnable = getUser()?.user?.isTwoFactorEnable;

  // Creating a browser router based on authentication status and routes
  const router = createBrowserRouter(
    isTwoFactorEnable
      ? privateRoutes
      : !isAuthenticated
      ? publicRoutes
      : protectedRoutes
  );

  // Rendering the App component with RouterProvider
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
