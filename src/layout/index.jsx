import React, { Suspense } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { LayoutContainer } from './style';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { StyledLoadingContainer } from 'styles/global';

const Layout = () => {
  const isMobile = useMediaQuery({ maxWidth: 520 });

  return (
    <LayoutContainer>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="layout">
        <div
          style={{
            height: '70px',
            ...(isMobile && {
              height: '60px'
            })
          }}
        >
          <Navbar />
        </div>
        <div className="content">
          <Suspense fallback={<StyledLoadingContainer />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Layout;
