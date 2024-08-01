import React from 'react';
import { Icons } from 'assets';
import { StyledAuthWrapper } from './style';
import { useLocation } from 'react-router-dom';

// The main authentication layout component
const Index = ({ subtitle, children }) => {
  const location = useLocation().pathname;
  const path = location.split('/')[1];

  return (
    <StyledAuthWrapper>
      <div className="content">
        <div className="content_top">
          <div className="content_top_logo">
            <img src={Icons.logo} alt="logo" />
          </div>
          <h3>{path.replace('-', ' ')}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="content_form">{children}</div>
      </div>
    </StyledAuthWrapper>
  );
};

export default Index;
